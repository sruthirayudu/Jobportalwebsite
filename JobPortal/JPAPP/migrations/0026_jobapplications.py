# Generated by Django 5.0.2 on 2024-04-21 05:47

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0025_addjobs_postedby'),
    ]

    operations = [
        migrations.CreateModel(
            name='jobapplications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('about', models.CharField(max_length=2500)),
                ('email', models.CharField(max_length=100)),
                ('mobile', models.CharField(max_length=100)),
                ('resume', models.ImageField(upload_to='Resume/')),
                ('job_id', models.IntegerField()),
                ('job_postedby', models.CharField(max_length=100)),
                ('last_login', models.DateTimeField(default=django.utils.timezone.now, verbose_name='last login')),
            ],
        ),
    ]
