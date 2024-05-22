from django.db import models
from generics.common_models import CommonModel

# Create your models here.

class FleetTag(CommonModel):
    """
        This model is responsible to store fleet tags.
    """
    fleet_tag_id = models.CharField(max_length=255, unique=True)
    fleet_tag_name = models.CharField(max_length=255, null=True, blank=True)
    last_event_time = models.DateTimeField(null=True, blank=True)
    last_event_code = models.CharField(max_length=255, null=True, blank=True)
    in_range = models.BooleanField(default=False)
    in_range_device_id = models.CharField(max_length=255, null=True, blank=True)
    last_location = models.CharField(max_length=255, null=True, blank=True)
    last_address = models.TextField(null=True, blank=True)
    last_altitude = models.FloatField(null=True, blank=True, help_text="Altitude in feet")
    distance_traveled = models.FloatField(null=True, blank=True, help_text="Distance traveled in miles")
    tag_signal_strength = models.CharField(max_length=255, null=True, blank=True)
    tag_battery_level = models.CharField(max_length=255, null=True, blank=True)
    temperature = models.FloatField(null=True, blank=True, help_text="Temperature in Fahrenheit")
    is_active = models.BooleanField(default=True)
    
    
    def __str__(self):
        return self.name