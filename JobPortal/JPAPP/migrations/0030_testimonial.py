# Generated by Django 5.0.2 on 2024-04-24 04:15

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0029_remove_jobapplications_comp_status_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='testimonial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('profession', models.CharField(max_length=100)),
                ('about', models.CharField(max_length=500)),
                ('img', models.ImageField(upload_to='testimonial/')),
                ('last_login', models.DateTimeField(default=django.utils.timezone.now, verbose_name='last login')),
            ],
        ),
    ]