# Generated by Django 5.0.2 on 2024-04-13 16:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0003_user'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='auth_user',
        ),
    ]
