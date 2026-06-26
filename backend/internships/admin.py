from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Attendance, Domain, LeaveRequest, Student, Task, User


@admin.register(User)
class ArkevionUserAdmin(UserAdmin):
    model = User
    list_display = ("email", "full_name", "role", "assigned_domain", "is_active", "is_staff")
    list_filter = ("role", "assigned_domain", "is_active")
    search_fields = ("email", "full_name")
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Profile", {"fields": ("full_name", "role", "assigned_domain")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "full_name", "role", "assigned_domain", "password1", "password2"),
        }),
    )


@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_active")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("user", "domain", "phone", "is_active")
    list_filter = ("domain", "is_active")
    search_fields = ("user__full_name", "user__email", "phone")


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "domain", "status", "due_date", "created_by")
    list_filter = ("domain", "status")
    filter_horizontal = ("assigned_students",)


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ("student", "date", "check_in_time", "check_out_time", "worked_hours", "status")
    list_filter = ("status", "date", "student__domain")


@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ("student", "leave_type", "start_date", "end_date", "status", "reviewed_by")
    list_filter = ("status", "leave_type", "student__domain")
