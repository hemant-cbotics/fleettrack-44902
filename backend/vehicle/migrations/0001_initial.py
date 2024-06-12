# Generated by Django 3.2.23 on 2024-05-13 11:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('server_id', models.CharField(max_length=255)),
                ('firmware_version', models.CharField(max_length=255)),
                ('unique_id', models.CharField(max_length=255)),
                ('prev_unique_id', models.CharField(max_length=255)),
                ('unique_id_last_change', models.DateTimeField()),
                ('is_active', models.BooleanField(default=False)),
                ('vehicle_description', models.TextField()),
                ('short_name', models.CharField(max_length=255)),
                ('vin', models.CharField(max_length=255)),
                ('vehicle_make', models.CharField(max_length=255)),
                ('vehicle_model', models.IntegerField()),
                ('licence_plate', models.CharField(max_length=255, unique=True)),
                ('licence_expiry', models.DateTimeField()),
                ('euipment_type', models.CharField(max_length=255)),
                ('equipment_status', models.CharField(max_length=255)),
                ('asset_type', models.CharField(max_length=255)),
                ('vehicle_class', models.CharField(max_length=255)),
                ('imei_or_esn_number', models.IntegerField()),
                ('serial_number', models.IntegerField()),
                ('country_code', models.IntegerField()),
                ('phone', models.IntegerField()),
                ('email', models.EmailField(max_length=254)),
                ('group_pushin_id', models.IntegerField()),
                ('map_route_color', models.CharField(max_length=255)),
                ('ignition_input', models.CharField(max_length=255)),
                ('maximum_speed', models.IntegerField()),
                ('fuel_type', models.CharField(max_length=255)),
                ('fuel_capacity', models.FloatField()),
                ('fuel_economy', models.FloatField()),
                ('fuel_cost', models.FloatField()),
                ('recorder_id', models.CharField(max_length=255)),
                ('recorder_on', models.CharField(max_length=255)),
                ('recorder_type', models.CharField(max_length=255)),
                ('prev_recorder_id', models.CharField(max_length=255)),
                ('recorder_id_last_changed', models.DateTimeField()),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vehicles', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Vehicle',
                'verbose_name_plural': 'Vehicles',
            },
        ),
    ]
