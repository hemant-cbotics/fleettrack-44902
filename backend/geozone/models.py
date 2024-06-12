from django.db import models
from generics.common_models import CommonModel
from generics.CONSTANTS import GeoZoneConstants, UserConstants

# Create your models here.

class Geozone(CommonModel):
    """
        This model is responsible to store Geozone details.
    """
    zone_id = models.CharField(max_length=255, unique=True)
    zone_type = models.CharField(max_length=255, choices=GeoZoneConstants.ZoneType.choices(), default=GeoZoneConstants.ZoneType.CIRCLE.value)
    organization = models.ForeignKey('organization.Organization', on_delete=models.CASCADE, related_name='geozone', default=None, null=True, blank=True)
    properties = models.JSONField(null=True, blank=True, default=dict)
    description = models.TextField(null=True, blank=True)
    geocode = models.TextField(null=True, blank=True)
    lat_lng = models.CharField(null=True, blank=True, max_length=255)
    overlap_priority = models.CharField(max_length=255, null=True, blank=True, choices=UserConstants.ZeroToTenInteger.choices(), default=UserConstants.ZeroToTenInteger.Zero.value)
    groups = models.ManyToManyField('group.Group', related_name='geozone', blank=True)
    reverse_geocode = models.BooleanField(default=False)
    arrival_geozone = models.BooleanField(default=False)
    departure_zone = models.BooleanField(default=False)
    zone_color = models.CharField(max_length=20, null=True, blank=True, choices=GeoZoneConstants.ZoneColor.choices(), default=GeoZoneConstants.ZoneColor.DEFAULT.value)
    speed_limit = models.FloatField(null=True, blank=True, help_text="Speed limit in Miles")
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='geozone', default=None, null=True, blank=True)

    def __str__(self):
        return self.zone_id

    class Meta:
        verbose_name = "Geozone"
        verbose_name_plural = "Geozones"