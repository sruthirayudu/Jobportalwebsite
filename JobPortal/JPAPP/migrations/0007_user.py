# Generated by Django 5.0.2 on 2024-04-14 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JPAPP', '0006_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('qualification', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=10)),
                ('state', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('profile_image', models.ImageField(upload_to='profile_images/')),
                ('mobile', models.CharField(max_length=15)),
            ],
        ),
    ]
