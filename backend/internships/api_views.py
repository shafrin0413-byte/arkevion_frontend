from django.contrib.auth import authenticate
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .forms import LeaveRequestForm, StudentForm, StudentProfileForm, TaskForm
from .models import Attendance, LeaveRequest, Student, Task, User


def user_payload(user):
    return {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "full_name": user.full_name,
        "role": user.role,
        "assigned_domain": user.assigned_domain.name if user.assigned_domain_id else None,
    }


def role_allowed(user, role):
    return user.is_authenticated and user.role == role


def role_denied_response():
    return Response({"detail": "You do not have permission to access this resource."}, status=403)


def attendance_payload(record):
    return {
        "id": record.id,
        "student_id": record.student_id,
        "student_name": record.student.user.full_name,
        "date": record.date,
        "check_in_time": record.check_in_time,
        "check_out_time": record.check_out_time,
        "worked_hours": record.worked_hours,
        "status": record.status,
        "status_display": record.get_status_display(),
        "is_running": bool(record.check_in_time and not record.check_out_time),
    }


def task_payload(task, student_count=None):
    assigned = list(task.assigned_students.select_related("user").all())
    assigned_names = [student.user.full_name for student in assigned]
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "due_date": task.due_date,
        "status": task.status,
        "status_display": task.get_status_display(),
        "created_at": task.created_at,
        "updated_at": task.updated_at,
        "assigned_student_ids": [student.id for student in assigned],
        "assigned_students": assigned_names,
        "assigned_to_display": "All Students" if student_count and len(assigned) == student_count else ", ".join(assigned_names) or "Not assigned",
    }


def leave_payload(leave):
    return {
        "id": leave.id,
        "student_id": leave.student_id,
        "student_name": leave.student.user.full_name,
        "domain": leave.student.domain.name,
        "leave_type": leave.leave_type,
        "leave_type_display": leave.get_leave_type_display(),
        "start_date": leave.start_date,
        "end_date": leave.end_date,
        "reason": leave.reason,
        "status": leave.status,
        "status_display": leave.get_status_display(),
        "reviewed_by": leave.reviewed_by.full_name if leave.reviewed_by_id else None,
        "reviewed_at": leave.reviewed_at,
        "created_at": leave.created_at,
    }


def student_payload(student):
    return {
        "id": student.id,
        "full_name": student.user.full_name,
        "email": student.user.email,
        "phone": student.phone,
        "college": student.college,
        "domain_id": student.domain_id,
        "domain": student.domain.name,
        "is_active": student.is_active,
        "created_at": student.created_at,
    }


def mentor_payload(student):
    mentor = User.objects.filter(
        role=User.Role.ADMIN,
        assigned_domain=student.domain,
        is_active=True,
    ).order_by("full_name").first()
    return user_payload(mentor) if mentor else None


def admin_students(user):
    return Student.objects.select_related("user", "domain").filter(domain=user.assigned_domain)


def student_context_payload(user):
    student = get_object_or_404(Student.objects.select_related("domain", "user"), user=user)
    today = timezone.localdate()
    attendance, _ = Attendance.objects.get_or_create(student=student, date=today)
    attendance.update_status()
    attendance.save(update_fields=["status"])
    tasks = student.tasks.prefetch_related("assigned_students__user").all()
    leaves = student.leave_requests.select_related("reviewed_by").all()[:8]
    attendance_history = student.attendance_records.select_related("student__user").all()[:30]
    total_attendance = student.attendance_records.count()
    present_attendance = student.attendance_records.filter(status=Attendance.Status.PRESENT).count()
    attendance_percentage = round((present_attendance / total_attendance) * 100, 1) if total_attendance else 0
    return {
        "student": student_payload(student),
        "mentor": mentor_payload(student),
        "today_attendance": attendance_payload(attendance),
        "attendance_history": [attendance_payload(row) for row in attendance_history],
        "attendance_percentage": attendance_percentage,
        "tasks": [task_payload(task) for task in tasks],
        "leaves": [leave_payload(leave) for leave in leaves],
        "summary": {
            "complete_tasks": tasks.filter(status=Task.Status.COMPLETE).count(),
            "progress_tasks": tasks.filter(status=Task.Status.PROGRESS).count(),
            "hold_tasks": tasks.filter(status=Task.Status.HOLD).count(),
            "total_tasks": tasks.count(),
        },
        "notifications": [],
    }


def login_for_role(request, role):
    identifier = request.data.get("email") or request.data.get("username")
    password = request.data.get("password")

    if not identifier or not password:
        return Response(
            {"detail": "Email or username and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(request, email=identifier, password=password)
    if user is None:
        return Response(
            {"detail": "Invalid email/username or password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if user.role != role:
        return Response(
            {"detail": "You do not have access to this portal."},
            status=status.HTTP_403_FORBIDDEN,
        )

    if not user.is_active:
        return Response(
            {"detail": "This account is disabled."},
            status=status.HTTP_403_FORBIDDEN,
        )

    refresh = RefreshToken.for_user(user)
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": user_payload(user),
    })


@api_view(["POST"])
@permission_classes([AllowAny])
def student_login_api(request):
    return login_for_role(request, User.Role.STUDENT)


@api_view(["POST"])
@permission_classes([AllowAny])
def admin_login_api(request):
    return login_for_role(request, User.Role.ADMIN)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_api(request):
    return Response({"user": user_payload(request.user)})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def student_portal_api(request):
    if not role_allowed(request.user, User.Role.STUDENT):
        return role_denied_response()
    return Response(student_context_payload(request.user))


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def student_check_in_api(request):
    if not role_allowed(request.user, User.Role.STUDENT):
        return role_denied_response()
    student = get_object_or_404(Student, user=request.user)
    attendance, _ = Attendance.objects.get_or_create(student=student, date=timezone.localdate())
    if not attendance.check_in_time or attendance.check_out_time:
        attendance.check_in_time = timezone.now()
        attendance.check_out_time = None
        attendance.save()
    return Response({"today_attendance": attendance_payload(attendance)})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def student_check_out_api(request):
    if not role_allowed(request.user, User.Role.STUDENT):
        return role_denied_response()
    student = get_object_or_404(Student, user=request.user)
    attendance = get_object_or_404(Attendance, student=student, date=timezone.localdate())
    attendance.close_session()
    attendance.save()
    return Response({"today_attendance": attendance_payload(attendance)})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def student_task_status_api(request, pk):
    if not role_allowed(request.user, User.Role.STUDENT):
        return role_denied_response()
    student = get_object_or_404(Student, user=request.user, is_active=True)
    task = get_object_or_404(Task, pk=pk, assigned_students=student)
    next_status = request.data.get("status")
    valid_statuses = {choice for choice, _ in Task.Status.choices}
    if next_status not in valid_statuses:
        return Response({"detail": "Please choose a valid task status."}, status=400)
    task.status = next_status
    task.save(update_fields=["status", "updated_at"])
    return Response({"task": task_payload(task)})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def student_leave_api(request):
    if not role_allowed(request.user, User.Role.STUDENT):
        return role_denied_response()
    student = get_object_or_404(Student, user=request.user)
    form = LeaveRequestForm(request.data)
    if not form.is_valid():
        return Response({"errors": form.errors}, status=400)
    leave = form.save(commit=False)
    leave.student = student
    leave.save()
    return Response({"leave": leave_payload(leave)}, status=201)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def student_profile_api(request):
    if not role_allowed(request.user, User.Role.STUDENT):
        return role_denied_response()
    student = get_object_or_404(Student.objects.select_related("user", "domain"), user=request.user)
    form = StudentProfileForm(request.data, instance=student)
    if not form.is_valid():
        return Response({"errors": form.errors}, status=400)
    form.save()
    return Response({"student": student_payload(student)})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_portal_api(request):
    if not role_allowed(request.user, User.Role.ADMIN):
        return role_denied_response()
    students = admin_students(request.user)
    tasks = Task.objects.filter(domain=request.user.assigned_domain).prefetch_related("assigned_students__user")
    leaves = LeaveRequest.objects.select_related("student__user", "student__domain", "reviewed_by").filter(
        student__domain=request.user.assigned_domain
    )
    attendance = Attendance.objects.select_related("student__user", "student__domain").filter(
        student__domain=request.user.assigned_domain
    )
    today = timezone.localdate()
    today_attendance = attendance.filter(date=today)
    student_count = students.count()
    return Response({
        "admin": user_payload(request.user),
        "students": [student_payload(student) for student in students],
        "tasks": [task_payload(task, student_count) for task in tasks],
        "leaves": [leave_payload(leave) for leave in leaves],
        "attendance": [attendance_payload(row) for row in attendance[:100]],
        "summary": {
            "student_count": student_count,
            "task_count": tasks.count(),
            "pending_leave_count": leaves.filter(status=LeaveRequest.Status.PENDING).count(),
            "present_today": today_attendance.filter(status=Attendance.Status.PRESENT).count(),
            "absent_today": max(student_count - today_attendance.exclude(status=Attendance.Status.ABSENT).count(), 0),
            "completed_tasks": tasks.filter(status=Task.Status.COMPLETE).count(),
        },
        "recent_tasks": [task_payload(task, student_count) for task in tasks.annotate(assignee_count=Count("assigned_students"))[:6]],
        "recent_leaves": [leave_payload(leave) for leave in leaves[:6]],
        "notifications": [],
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_students_api(request):
    if not role_allowed(request.user, User.Role.ADMIN):
        return role_denied_response()
    form = StudentForm(request.data, admin_user=request.user)
    if not form.is_valid():
        return Response({"errors": form.errors}, status=400)
    return Response({"student": student_payload(form.save())}, status=201)


@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def admin_student_detail_api(request, pk):
    if not role_allowed(request.user, User.Role.ADMIN):
        return role_denied_response()
    student = get_object_or_404(admin_students(request.user), pk=pk)
    if request.method == "DELETE":
        student.user.delete()
        return Response(status=204)
    form = StudentForm(request.data, admin_user=request.user, instance=student)
    if not form.is_valid():
        return Response({"errors": form.errors}, status=400)
    return Response({"student": student_payload(form.save())})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_tasks_api(request):
    if not role_allowed(request.user, User.Role.ADMIN):
        return role_denied_response()
    form = TaskForm(request.data, admin_user=request.user)
    if not form.is_valid():
        return Response({"errors": form.errors}, status=400)
    task = form.save(commit=False)
    task.domain = request.user.assigned_domain
    task.created_by = request.user
    task.save()
    form.save_assignment(task)
    return Response({"task": task_payload(task, admin_students(request.user).count())}, status=201)


@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def admin_task_detail_api(request, pk):
    if not role_allowed(request.user, User.Role.ADMIN):
        return role_denied_response()
    task = get_object_or_404(Task, pk=pk, domain=request.user.assigned_domain)
    if request.method == "DELETE":
        task.delete()
        return Response(status=204)
    form = TaskForm(request.data, instance=task, admin_user=request.user)
    if not form.is_valid():
        return Response({"errors": form.errors}, status=400)
    task = form.save()
    form.save_assignment(task)
    return Response({"task": task_payload(task, admin_students(request.user).count())})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_leave_review_api(request, pk, action):
    if not role_allowed(request.user, User.Role.ADMIN):
        return role_denied_response()
    leave = get_object_or_404(
        LeaveRequest.objects.select_related("student__domain", "student__user"),
        pk=pk,
        student__domain=request.user.assigned_domain,
    )
    if action not in {"approve", "reject"}:
        return Response({"detail": "Invalid leave action."}, status=400)
    leave.review(request.user, LeaveRequest.Status.APPROVED if action == "approve" else LeaveRequest.Status.REJECTED)
    leave.save()
    return Response({"leave": leave_payload(leave)})
