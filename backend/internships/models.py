from datetime import timedelta

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, username=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("role", User.Role.ADMIN)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self._create_user(email, password, **extra_fields)


class Domain(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=90, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        STUDENT = "student", "Student"

    username = models.CharField(max_length=150, unique=True, blank=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150)
    role = models.CharField(max_length=20, choices=Role.choices)
    assigned_domain = models.ForeignKey(
        Domain,
        on_delete=models.PROTECT,
        related_name="users",
        null=True,
        blank=True,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]
    objects = UserManager()

    def save(self, *args, **kwargs):
        self.username = self.email
        super().save(*args, **kwargs)

    @property
    def is_domain_admin(self):
        return self.role == self.Role.ADMIN and self.assigned_domain_id

    @property
    def is_student_user(self):
        return self.role == self.Role.STUDENT

    def __str__(self):
        return f"{self.full_name} ({self.email})"


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    domain = models.ForeignKey(Domain, on_delete=models.PROTECT, related_name="students")
    phone = models.CharField(max_length=20, blank=True)
    college = models.CharField(max_length=160, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["user__full_name"]

    def clean(self):
        if self.user.role != User.Role.STUDENT:
            raise ValidationError("Student profile must be linked to a student user.")

    def __str__(self):
        return self.user.full_name


class Task(models.Model):
    class Status(models.TextChoices):
        COMPLETE = "complete", "Complete"
        PROGRESS = "progress", "Progress"
        HOLD = "hold", "Hold"

    title = models.CharField(max_length=160)
    description = models.TextField()
    domain = models.ForeignKey(Domain, on_delete=models.PROTECT, related_name="tasks")
    assigned_students = models.ManyToManyField(Student, related_name="tasks", blank=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name="created_tasks")
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PROGRESS)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Attendance(models.Model):
    class Status(models.TextChoices):
        PRESENT = "present", "Present"
        HALF_DAY = "half_day", "Half Day"
        ABSENT = "absent", "Absent"

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="attendance_records")
    date = models.DateField(default=timezone.localdate)
    check_in_time = models.DateTimeField(null=True, blank=True)
    check_out_time = models.DateTimeField(null=True, blank=True)
    worked_duration = models.DurationField(default=timedelta)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ABSENT)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["student", "date"], name="unique_student_attendance_date")
        ]
        ordering = ["-date", "-check_in_time"]

    @property
    def worked_hours(self):
        total = self.worked_duration.total_seconds()
        if self.check_in_time and not self.check_out_time:
            total += (timezone.now() - self.check_in_time).total_seconds()
        return round(total / 3600, 2)

    def update_status(self):
        hours = self.worked_hours
        if hours >= 4:
            self.status = self.Status.PRESENT
        elif hours >= 2:
            self.status = self.Status.HALF_DAY
        else:
            self.status = self.Status.ABSENT

    def close_session(self):
        if self.check_in_time and not self.check_out_time:
            self.check_out_time = timezone.now()
            self.worked_duration += self.check_out_time - self.check_in_time
            self.update_status()

    def __str__(self):
        return f"{self.student} - {self.date}"


class LeaveRequest(models.Model):
    class LeaveType(models.TextChoices):
        SICK = "sick", "Sick Leave"
        CASUAL = "casual", "Casual Leave"
        EMERGENCY = "emergency", "Emergency Leave"
        OTHER = "other", "Other"

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="leave_requests")
    leave_type = models.CharField(max_length=20, choices=LeaveType.choices)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def clean(self):
        if self.end_date < self.start_date:
            raise ValidationError("End date cannot be earlier than start date.")

    def review(self, admin_user, status):
        self.status = status
        self.reviewed_by = admin_user
        self.reviewed_at = timezone.now()

    def __str__(self):
        return f"{self.student} - {self.get_leave_type_display()}"
