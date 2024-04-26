# Generated by Django 5.0.2 on 2024-04-23 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0027_jobapplications_application_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplications',
            name='city',
            field=models.CharField(default='e', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobapplications',
            name='comp_status',
            field=models.CharField(default='a', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobapplications',
            name='company',
            field=models.CharField(default='ss', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobapplications',
            name='company_status',
            field=models.CharField(default='dddf', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobapplications',
            name='languages',
            field=models.CharField(default='dff', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobapplications',
            name='qualification',
            field=models.CharField(default='dsf', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobapplications',
            name='skills',
            field=models.CharField(default='dd', max_length=100),
            preserve_default=False,
        ),
    ]
