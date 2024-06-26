# Generated by Django 5.0.2 on 2024-04-20 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0021_rename_job_post_addjobs'),
    ]

    operations = [
        migrations.RenameField(
            model_name='addjobs',
            old_name='comp_address',
            new_name='preference',
        ),
        migrations.AlterField(
            model_name='addjobs',
            name='comp_dtls',
            field=models.CharField(max_length=2500),
        ),
        migrations.AlterField(
            model_name='addjobs',
            name='description',
            field=models.CharField(max_length=2500),
        ),
        migrations.AlterField(
            model_name='addjobs',
            name='job_summary',
            field=models.CharField(max_length=2500),
        ),
        migrations.AlterField(
            model_name='addjobs',
            name='role',
            field=models.CharField(max_length=2500),
        ),
    ]
