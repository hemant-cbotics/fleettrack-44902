# Generated by Django 3.2.23 on 2024-05-15 09:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0004_alter_inviteduser_username'),
        ('group', '0002_group_created_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='organization',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='groups', to='organization.organization'),
        ),
    ]
