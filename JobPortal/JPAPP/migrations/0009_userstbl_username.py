# Generated by Django 5.0.2 on 2024-04-14 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0008_rename_user_userstbl'),
    ]

    operations = [
        migrations.AddField(
            model_name='userstbl',
            name='username',
            field=models.EmailField(default='a', max_length=128),
            preserve_default=False,
        ),
    ]
