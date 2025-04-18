# Generated by Django 5.1.4 on 2025-03-19 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sports', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='athlete',
            name='social_links',
        ),
        migrations.RemoveField(
            model_name='athlete',
            name='user',
        ),
        migrations.AddField(
            model_name='athlete',
            name='date_of_birth',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='athlete',
            name='name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='athlete',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='athlete_profiles/'),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('admin', 'Admin'), ('organization_manager', 'Organization Manager'), ('judge', 'Judge')], default='organization_manager', max_length=20),
        ),
    ]
