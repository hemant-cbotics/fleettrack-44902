# Generated by Django 3.2.23 on 2024-05-13 15:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0004_alter_inviteduser_username'),
        ('vehicle', '0003_alter_vehicle_vehicle_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicle',
            name='organization',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='vehicles', to='organization.organization'),
        ),
    ]
