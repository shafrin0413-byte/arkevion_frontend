from functools import wraps

from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone

from .forms import (
    AdminRegistrationForm,
    ArkevionAuthForm,
    LeaveRequestForm,
    PasswordResetForm,
    StudentProfileForm,
    StudentForm,
    TaskForm,
)
from .models import Attendance, LeaveRequest, Student, Task, User


def role_required(role):
    def decorator(view_func):
        @wraps(view_func)
        @login_required
        def wrapped(request, *args, **kwargs):
            if request.user.role != role:
                messages.error(request, "You do not have permission to access that page.")
                return redirect("dashboard_redirect")
            return view_func(request, *args, **kwargs)

        return wrapped

    return decorator


def dashboard_redirect(request):
    if not request.user.is_authenticated:
        return redirect("student_login")
    if request.user.role == User.Role.ADMIN:
        return redirect("admin_dashboard")
    return redirect("student_dashboard")


def student_login(request):
    form = ArkevionAuthForm(request.POST or None, role=User.Role.STUDENT)
    if request.method == "POST" and form.is_valid():
        login(request, form.user)
        return redirect("student_dashboard")
    return render(request, "ims/student/login.html", {
        "form": form,
        "eyebrow": "Student Portal",
        "heading": "Internship work, attendance, and leave in one place.",
        "subheading": "Login with the email and password assigned by your Arkevion domain admin.",
        "form_title": "Student Login",
        "button_text": "Login",
    })


def admin_login(request):
    form = ArkevionAuthForm(request.POST or None, role=User.Role.ADMIN)
    if request.method == "POST" and form.is_valid():
        login(request, form.user)
        return redirect("admin_dashboard")
    return render(request, "ims/admin/login.html", {
        "form": form,
        "eyebrow": "Admin Portal",
        "heading": "Manage your internship domain with clarity.",
        "subheading": "Add students, assign tasks, monitor attendance, and review leave requests securely.",
        "form_title": "Admin Login",
        "button_text": "Login",
    })


def admin_register(request):
    form = AdminRegistrationForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Admin account created. Please log in.")
        return redirect("admin_login")
    return render(request, "ims/admin/register.html", {
        "form": form,
        "eyebrow": "Admin Registration",
        "heading": "Create a domain-scoped admin account.",
        "subheading": "Admins can manage only the students, tasks, attendance, and leaves in their assigned domain.",
        "form_title": "Admin Register",
        "button_text": "Create Account",
    })


def logout_view(request):
    logout(request)
    return redirect("student_login")


def admin_students(request):
    return Student.objects.select_related("user", "domain").filter(domain=request.user.assigned_domain)


@role_required(User.Role.ADMIN)
def admin_dashboard(request):
    students = admin_students(request)
    tasks = Task.objects.filter(domain=request.user.assigned_domain)
    leaves = LeaveRequest.objects.select_related("student__user", "student__domain").filter(
        student__domain=request.user.assigned_domain
    )
    attendance = Attendance.objects.select_related("student__user").filter(
        student__domain=request.user.assigned_domain
    )[:8]
    context = {
        "student_count": students.count(),
        "task_count": tasks.count(),
        "pending_leave_count": leaves.filter(status=LeaveRequest.Status.PENDING).count(),
        "attendance": attendance,
        "tasks": tasks.annotate(assignee_count=Count("assigned_students"))[:6],
        "leaves": leaves[:6],
    }
    return render(request, "ims/admin/dashboard.html", context)


@role_required(User.Role.ADMIN)
def admin_reports(request):
    students = admin_students(request)
    tasks = Task.objects.filter(domain=request.user.assigned_domain)
    leaves = LeaveRequest.objects.select_related("student__user", "student__domain").filter(
        student__domain=request.user.assigned_domain
    )
    attendance = Attendance.objects.select_related("student__user").filter(
        student__domain=request.user.assigned_domain
    )
    context = {
        "student_count": students.count(),
        "course_count": tasks.count(),
        "attendance_count": attendance.count(),
        "pending_leave_count": leaves.filter(status=LeaveRequest.Status.PENDING).count(),
        "recent_attendance": attendance[:8],
        "recent_leaves": leaves[:8],
    }
    return render(request, "ims/admin/reports.html", context)


@role_required(User.Role.ADMIN)
def admin_settings(request):
    return redirect("leave_list")


@role_required(User.Role.ADMIN)
def student_list(request):
    return render(request, "ims/admin/student_list.html", {"students": admin_students(request)})


@role_required(User.Role.ADMIN)
def student_create(request):
    form = StudentForm(request.POST or None, admin_user=request.user)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Student added successfully.")
        return redirect("student_list")
    return render(request, "ims/admin/student_form.html", {"form": form, "title": "Add Student"})


@role_required(User.Role.ADMIN)
def student_edit(request, pk):
    student = get_object_or_404(admin_students(request), pk=pk)
    form = StudentForm(request.POST or None, admin_user=request.user, instance=student)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Student updated successfully.")
        return redirect("student_list")
    return render(request, "ims/admin/student_form.html", {"form": form, "title": "Edit Student"})


@role_required(User.Role.ADMIN)
def student_delete(request, pk):
    student = get_object_or_404(admin_students(request), pk=pk)
    if request.method == "POST":
        student.user.delete()
        messages.success(request, "Student deleted successfully.")
        return redirect("student_list")
    return render(request, "ims/admin/confirm_delete.html", {"object": student, "type": "student"})


@role_required(User.Role.ADMIN)
def student_reset_password(request, pk):
    student = get_object_or_404(admin_students(request), pk=pk)
    form = PasswordResetForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        student.user.set_password(form.cleaned_data["password"])
        student.user.save()
        messages.success(request, "Password reset successfully.")
        return redirect("student_list")
    return render(request, "ims/admin/reset_password.html", {"form": form, "student": student})


@role_required(User.Role.ADMIN)
def task_list(request):
    tasks = Task.objects.filter(domain=request.user.assigned_domain).prefetch_related("assigned_students")
    return render(request, "ims/admin/task_list.html", {
        "tasks": tasks,
        "student_count": admin_students(request).count(),
    })


@role_required(User.Role.ADMIN)
def task_create(request):
    form = TaskForm(request.POST or None, admin_user=request.user)
    if request.method == "POST" and form.is_valid():
        task = form.save(commit=False)
        task.domain = request.user.assigned_domain
        task.created_by = request.user
        task.save()
        form.save_assignment(task)
        messages.success(request, "Task created and assigned successfully.")
        return redirect("task_list")
    return render(request, "ims/admin/task_form.html", {"form": form, "title": "Create Task"})


@role_required(User.Role.ADMIN)
def task_edit(request, pk):
    task = get_object_or_404(Task, pk=pk, domain=request.user.assigned_domain)
    form = TaskForm(request.POST or None, instance=task, admin_user=request.user)
    if request.method == "POST" and form.is_valid():
        task = form.save()
        form.save_assignment(task)
        messages.success(request, "Task updated successfully.")
        return redirect("task_list")
    return render(request, "ims/admin/task_form.html", {"form": form, "title": "Edit Task"})


@role_required(User.Role.STUDENT)
def task_status_update(request, pk):
    student = get_object_or_404(Student, user=request.user, is_active=True)
    task = get_object_or_404(Task, pk=pk, assigned_students=student)
    if request.method == "POST":
        status = request.POST.get("status")
        valid_statuses = {choice for choice, _ in Task.Status.choices}
        if status in valid_statuses:
            task.status = status
            task.save(update_fields=["status", "updated_at"])
            messages.success(request, "Task status updated.")
        else:
            messages.error(request, "Please choose a valid task status.")
    return redirect(request.META.get("HTTP_REFERER", "student_courses"))


@role_required(User.Role.ADMIN)
def task_delete(request, pk):
    task = get_object_or_404(Task, pk=pk, domain=request.user.assigned_domain)
    if request.method == "POST":
        task.delete()
        messages.success(request, "Task deleted successfully.")
        return redirect("task_list")
    return render(request, "ims/admin/confirm_delete.html", {"object": task, "type": "task"})


@role_required(User.Role.ADMIN)
def attendance_list(request):
    records = Attendance.objects.select_related("student__user", "student__domain").filter(
        student__domain=request.user.assigned_domain
    )
    return render(request, "ims/admin/attendance_list.html", {"records": records})


@role_required(User.Role.ADMIN)
def leave_list(request):
    leaves = LeaveRequest.objects.select_related("student__user", "student__domain").filter(
        student__domain=request.user.assigned_domain
    )
    return render(request, "ims/admin/leave_list.html", {"leaves": leaves})


@role_required(User.Role.ADMIN)
def leave_review(request, pk, action):
    leave = get_object_or_404(
        LeaveRequest.objects.select_related("student__domain"),
        pk=pk,
        student__domain=request.user.assigned_domain,
    )
    if request.method == "POST" and action in {"approve", "reject"}:
        status = LeaveRequest.Status.APPROVED if action == "approve" else LeaveRequest.Status.REJECTED
        leave.review(request.user, status)
        leave.save()
        messages.success(request, f"Leave request {leave.get_status_display().lower()}.")
    return redirect("leave_list")


def student_portal_context(request):
    student = get_object_or_404(Student.objects.select_related("domain", "user"), user=request.user)
    today = timezone.localdate()
    attendance, _ = Attendance.objects.get_or_create(student=student, date=today)
    attendance.update_status()
    attendance.save(update_fields=["status"])
    tasks = student.tasks.all()
    leaves = student.leave_requests.all()[:8]
    leave_form = LeaveRequestForm()
    mentor = User.objects.filter(
        role=User.Role.ADMIN,
        assigned_domain=student.domain,
        is_active=True,
    ).order_by("full_name").first()
    context = {
        "student": student,
        "mentor": mentor,
        "tasks": tasks,
        "attendance": attendance,
        "leaves": leaves,
        "leave_form": leave_form,
        "profile_form": StudentProfileForm(instance=student),
        "complete_tasks": tasks.filter(status=Task.Status.COMPLETE).count(),
        "progress_tasks": tasks.filter(status=Task.Status.PROGRESS).count(),
        "hold_tasks": tasks.filter(status=Task.Status.HOLD).count(),
    }
    return context


@role_required(User.Role.STUDENT)
def student_dashboard(request):
    context = student_portal_context(request)
    return render(request, "ims/student/dashboard.html", context)


@role_required(User.Role.STUDENT)
def student_profile(request):
    context = student_portal_context(request)
    student = context["student"]
    form = StudentProfileForm(request.POST or None, instance=student)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Profile updated successfully.")
        return redirect("student_profile")
    context["profile_form"] = form
    return render(request, "ims/student/profile.html", context)


@role_required(User.Role.STUDENT)
def student_courses(request):
    return render(request, "ims/student/courses.html", student_portal_context(request))


@role_required(User.Role.STUDENT)
def student_attendance(request):
    return render(request, "ims/student/attendance.html", student_portal_context(request))


@role_required(User.Role.STUDENT)
def student_results(request):
    return render(request, "ims/student/results.html", student_portal_context(request))


@role_required(User.Role.STUDENT)
def student_settings(request):
    return redirect("student_leave")


@role_required(User.Role.STUDENT)
def student_leave(request):
    return render(request, "ims/student/leave.html", student_portal_context(request))


@role_required(User.Role.STUDENT)
def check_in(request):
    if request.method == "POST":
        student = get_object_or_404(Student, user=request.user)
        attendance, _ = Attendance.objects.get_or_create(student=student, date=timezone.localdate())
        if not attendance.check_in_time or attendance.check_out_time:
            attendance.check_in_time = timezone.now()
            attendance.check_out_time = None
            attendance.save()
            messages.success(request, "Checked in successfully.")
    return redirect(request.META.get("HTTP_REFERER", "student_attendance"))


@role_required(User.Role.STUDENT)
def check_out(request):
    if request.method == "POST":
        student = get_object_or_404(Student, user=request.user)
        attendance = get_object_or_404(Attendance, student=student, date=timezone.localdate())
        attendance.close_session()
        attendance.save()
        messages.success(request, "Checked out successfully.")
    return redirect(request.META.get("HTTP_REFERER", "student_attendance"))


@role_required(User.Role.STUDENT)
def submit_leave(request):
    student = get_object_or_404(Student, user=request.user)
    form = LeaveRequestForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        leave = form.save(commit=False)
        leave.student = student
        leave.save()
        messages.success(request, "Leave request submitted.")
    else:
        messages.error(request, "Please correct the leave request form.")
    return redirect("student_leave")
