# Generated by Django 5.0.2 on 2024-04-20 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0022_rename_comp_address_addjobs_preference_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addjobs',
            name='skills',
            field=models.CharField(max_length=1000),
        ),
    ]