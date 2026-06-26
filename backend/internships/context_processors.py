from django.conf import settings


def site_urls(request):
    return {
        "frontend_url": settings.FRONTEND_URL,
    }
