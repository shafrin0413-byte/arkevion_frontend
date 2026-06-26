from django import forms
from django.contrib.auth import authenticate

from .models import Domain, LeaveRequest, Student, Task, User


class ArkevionAuthForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={"placeholder": "Email"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={"placeholder": "Password"}))

    def __init__(self, *args, role=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.role = role
        self.user = None
        for field in self.fields.values():
            field.widget.attrs["class"] = "ark-input"

    def clean(self):
        cleaned = super().clean()
        email = cleaned.get("email")
        password = cleaned.get("password")
        if email and password:
            self.user = authenticate(email=email, password=password)
            if self.user is None:
                raise forms.ValidationError("Invalid email or password.")
            if self.role and self.user.role != self.role:
                raise forms.ValidationError("You do not have access to this portal.")
            if not self.user.is_active:
                raise forms.ValidationError("This account is disabled.")
        return cleaned


class AdminRegistrationForm(forms.ModelForm):
    role = forms.ChoiceField(
        choices=User.Role.choices,
        initial=User.Role.ADMIN,
        widget=forms.Select,
        help_text="Choose Admin for domain management or Student for portal access.",
    )
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ["full_name", "email", "role", "password", "confirm_password", "assigned_domain"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["assigned_domain"].queryset = Domain.objects.filter(is_active=True)
        self.fields["assigned_domain"].empty_label = "Select domain"
        for field in self.fields.values():
            field.widget.attrs["class"] = "ark-input"

    def clean(self):
        cleaned = super().clean()
        if cleaned.get("password") != cleaned.get("confirm_password"):
            raise forms.ValidationError("Passwords do not match.")
        if cleaned.get("role") and not cleaned.get("assigned_domain"):
            raise forms.ValidationError("Please select a domain for this account.")
        return cleaned

    def save(self, commit=True):
        user = super().save(commit=False)
        user.role = self.cleaned_data["role"]
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
            if user.role == User.Role.STUDENT:
                Student.objects.get_or_create(
                    user=user,
                    defaults={"domain": user.assigned_domain},
                )
        return user


class StudentForm(forms.Form):
    full_name = forms.CharField(max_length=150)
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput, required=False)
    phone = forms.CharField(max_length=20, required=False)
    college = forms.CharField(max_length=160, required=False)
    domain = forms.ModelChoiceField(queryset=Domain.objects.none())
    is_active = forms.BooleanField(required=False, initial=True)

    def __init__(self, *args, admin_user=None, instance=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.admin_user = admin_user
        self.instance = instance
        self.fields["domain"].queryset = Domain.objects.filter(pk=admin_user.assigned_domain_id)
        if instance:
            self.fields["password"].required = False
            self.fields["full_name"].initial = instance.user.full_name
            self.fields["email"].initial = instance.user.email
            self.fields["phone"].initial = instance.phone
            self.fields["college"].initial = instance.college
            self.fields["domain"].initial = instance.domain
            self.fields["is_active"].initial = instance.is_active
        else:
            self.fields["password"].required = True
        for field in self.fields.values():
            field.widget.attrs["class"] = "ark-input"

    def clean_email(self):
        email = self.cleaned_data["email"]
        qs = User.objects.filter(email=email)
        if self.instance:
            qs = qs.exclude(pk=self.instance.user_id)
        if qs.exists():
            raise forms.ValidationError("A user with this email already exists.")
        return email

    def save(self):
        data = self.cleaned_data
        if self.instance:
            user = self.instance.user
            student = self.instance
        else:
            user = User(role=User.Role.STUDENT)
            student = Student(user=user)
        user.full_name = data["full_name"]
        user.email = data["email"]
        user.assigned_domain = data["domain"]
        user.is_active = data["is_active"]
        if data.get("password"):
            user.set_password(data["password"])
        user.save()
        student.domain = data["domain"]
        student.phone = data.get("phone", "")
        student.college = data.get("college", "")
        student.is_active = data["is_active"]
        student.save()
        return student


class StudentProfileForm(forms.Form):
    full_name = forms.CharField(max_length=150, label="Full Name")
    phone = forms.CharField(max_length=20, required=False, label="Mobile Number")
    email = forms.EmailField(label="Email Address")
    college = forms.CharField(max_length=160, required=False, label="College")

    def __init__(self, *args, instance=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.instance = instance
        if instance:
            self.fields["full_name"].initial = instance.user.full_name
            self.fields["phone"].initial = instance.phone
            self.fields["email"].initial = instance.user.email
            self.fields["college"].initial = instance.college
        for field in self.fields.values():
            field.widget.attrs["class"] = "ark-input"

    def clean_email(self):
        email = self.cleaned_data["email"]
        qs = User.objects.filter(email=email)
        if self.instance:
            qs = qs.exclude(pk=self.instance.user_id)
        if qs.exists():
            raise forms.ValidationError("A user with this email already exists.")
        return email

    def save(self):
        data = self.cleaned_data
        student = self.instance
        student.user.full_name = data["full_name"]
        student.user.email = data["email"]
        student.user.save()
        student.phone = data.get("phone", "")
        student.college = data.get("college", "")
        student.save()
        return student


class PasswordResetForm(forms.Form):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs["class"] = "ark-input"

    def clean(self):
        cleaned = super().clean()
        if cleaned.get("password") != cleaned.get("confirm_password"):
            raise forms.ValidationError("Passwords do not match.")
        return cleaned


class TaskForm(forms.ModelForm):
    ALL_STUDENTS = "__all__"
    assign_to = forms.ChoiceField(label="Assign To")

    class Meta:
        model = Task
        fields = ["title", "description", "assign_to", "due_date"]
        widgets = {"due_date": forms.DateInput(attrs={"type": "date"})}

    def __init__(self, *args, admin_user=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.admin_user = admin_user
        self.students = Student.objects.select_related("user").filter(
            domain=admin_user.assigned_domain,
            is_active=True,
            user__role=User.Role.STUDENT,
        )
        choices = [(self.ALL_STUDENTS, "All Students")]
        choices += [(str(student.pk), student.user.full_name) for student in self.students]
        self.fields["assign_to"].choices = choices
        if self.instance and self.instance.pk:
            assigned_ids = set(self.instance.assigned_students.values_list("pk", flat=True))
            student_ids = set(self.students.values_list("pk", flat=True))
            if assigned_ids and assigned_ids == student_ids:
                self.fields["assign_to"].initial = self.ALL_STUDENTS
            elif len(assigned_ids) == 1:
                self.fields["assign_to"].initial = str(next(iter(assigned_ids)))
        for field in self.fields.values():
            field.widget.attrs["class"] = "ark-input"

    def save_assignment(self, task):
        target = self.cleaned_data["assign_to"]
        if target == self.ALL_STUDENTS:
            task.assigned_students.set(self.students)
            return
        student = self.students.get(pk=target)
        task.assigned_students.set([student])


class LeaveRequestForm(forms.ModelForm):
    class Meta:
        model = LeaveRequest
        fields = ["leave_type", "start_date", "end_date", "reason"]
        widgets = {
            "start_date": forms.DateInput(attrs={"type": "date"}),
            "end_date": forms.DateInput(attrs={"type": "date"}),
            "reason": forms.Textarea(attrs={"rows": 4}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs["class"] = "ark-input"
