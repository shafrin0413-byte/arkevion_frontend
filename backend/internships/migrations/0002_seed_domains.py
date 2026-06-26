from django.db import migrations


DOMAINS = [
    ("Full Stack Development", "full-stack-development"),
    ("Web Development", "web-development"),
    ("Mobile Development", "mobile-development"),
    ("UI/UX Design", "ui-ux-design"),
    ("AI Automation", "ai-automation"),
    ("Digital Marketing", "digital-marketing"),
]


def seed_domains(apps, schema_editor):
    Domain = apps.get_model("internships", "Domain")
    for name, slug in DOMAINS:
        Domain.objects.get_or_create(slug=slug, defaults={"name": name, "is_active": True})


class Migration(migrations.Migration):
    dependencies = [
        ("internships", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_domains, migrations.RunPython.noop),
    ]
