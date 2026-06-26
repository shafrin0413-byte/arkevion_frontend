from django.urls import path

from . import api_views

urlpatterns = [
    path("auth/student/login/", api_views.student_login_api, name="api_student_login"),
    path("auth/admin/login/", api_views.admin_login_api, name="api_admin_login"),
    path("auth/me/", api_views.me_api, name="api_me"),
    path("student/portal/", api_views.student_portal_api, name="api_student_portal"),
    path("student/check-in/", api_views.student_check_in_api, name="api_student_check_in"),
    path("student/check-out/", api_views.student_check_out_api, name="api_student_check_out"),
    path("student/tasks/<int:pk>/status/", api_views.student_task_status_api, name="api_student_task_status"),
    path("student/leave-requests/", api_views.student_leave_api, name="api_student_leave"),
    path("student/profile/", api_views.student_profile_api, name="api_student_profile"),
    path("admin/portal/", api_views.admin_portal_api, name="api_admin_portal"),
    path("admin/students/", api_views.admin_students_api, name="api_admin_students"),
    path("admin/students/<int:pk>/", api_views.admin_student_detail_api, name="api_admin_student_detail"),
    path("admin/tasks/", api_views.admin_tasks_api, name="api_admin_tasks"),
    path("admin/tasks/<int:pk>/", api_views.admin_task_detail_api, name="api_admin_task_detail"),
    path("admin/leaves/<int:pk>/<str:action>/", api_views.admin_leave_review_api, name="api_admin_leave_review"),
]
