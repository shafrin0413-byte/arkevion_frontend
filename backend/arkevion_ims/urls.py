from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("api/", include("internships.api_urls")),
    path("internships/", include("internships.urls")),
]
