from django.db import models
from generics.common_models import UUIDModel

# Create your models here.

class Vehicle(UUIDModel):
    """
        This model is responsible to store vehicle details.
    """
    server_id = models.CharField(max_length=255, null=True, blank=True)
    firmware_version = models.CharField(max_length=255, null=True, blank=True)
    unique_id = models.CharField(max_length=255, null=True, blank=True)
    prev_unique_id = models.CharField(max_length=255, null=True, blank=True)
    unique_id_last_change = models.DateTimeField(default=None, null=True, blank=True)
    is_active = models.BooleanField(default=False)
    vehicle_description = models.TextField(null=True, blank=True)
    short_name = models.CharField(max_length=255, null=True, blank=True)
    vin = models.CharField(max_length=255, null=True, blank=True)
    vehicle_make = models.CharField(max_length=255, null=True, blank=True)
    vehicle_model = models.IntegerField(null=True, blank=True)
    licence_plate = models.CharField(max_length=255, unique=True)
    licence_expiry = models.DateTimeField(default=None, null=True, blank=True)
    euipment_type = models.CharField(max_length=255, null=True, blank=True)
    equipment_status = models.CharField(max_length=255, null=True, blank=True)
    asset_type = models.CharField(max_length=255, null=True, blank=True)
    vehicle_class = models.CharField(max_length=255, null=True, blank=True)
    imei_or_esn_number = models.IntegerField(null=True, blank=True)
    serial_number = models.IntegerField(null=True, blank=True)
    country_code = models.IntegerField(null=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    group_pushin_id = models.IntegerField(null=True, blank=True)
    map_route_color = models.CharField(max_length=255, null=True, blank=True)
    ignition_input = models.CharField(max_length=255, null=True, blank=True)
    maximum_speed = models.IntegerField(null=True, blank=True)
    # driver to be made
    fuel_type = models.CharField(max_length=255, null=True, blank=True)
    fuel_capacity = models.FloatField(null=True, blank=True)
    fuel_economy = models.FloatField(null=True, blank=True)
    fuel_cost = models.FloatField(null=True, blank=True)
    # camera fields 
    recorder_id = models.CharField(max_length=255, null=True, blank=True)
    recorder_on = models.CharField(max_length=255, null=True, blank=True)
    recorder_type = models.CharField(max_length=255, null=True, blank=True)
    prev_recorder_id = models.CharField(max_length=255, null=True, blank=True)
    recorder_id_last_changed = models.DateTimeField(default=None, null=True, blank=True)
    added_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='vehicles')


    def __str__(self):
        return self.short_name

    class Meta:
        verbose_name = "Vehicle"
        verbose_name_plural = "Vehicles"