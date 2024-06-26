# Generated by Django 5.0.2 on 2024-04-14 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0009_userstbl_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='userstbl',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='userstbl',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userstbl',
            name='last_login',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
