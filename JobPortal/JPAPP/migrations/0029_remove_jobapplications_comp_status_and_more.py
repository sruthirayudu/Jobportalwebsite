# Generated by Django 5.0.2 on 2024-04-23 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0028_jobapplications_city_jobapplications_comp_status_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jobapplications',
            name='comp_status',
        ),
        migrations.AlterField(
            model_name='addjobs',
            name='city',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='addjobs',
            name='state',
            field=models.IntegerField(),
        ),
    ]
