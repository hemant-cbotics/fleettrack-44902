from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from generics.common_models import CommonModel
from generics.CONSTANTS import UserConstants


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    email = models.EmailField(_('email address'), unique = True)

    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['username']

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class UserRoleAndPermission(CommonModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='role_and_permission')
    role = models.ForeignKey('organization.OrganizationRole', on_delete=models.CASCADE, related_name='organization_roles')
    custom_permissions = models.JSONField(default=[], null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.user.email} - {self.role.name}'
    
class UserProfile(CommonModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    description = models.TextField(null=True, blank=True)
    country_code = models.CharField(max_length=10, null=True, blank=True)
    mobile = models.CharField(max_length=15, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    two_factor_auth = models.BooleanField(default=False)
    user_geozone_labels = models.BooleanField(default=False)
    enable_sso_vistrack = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)
    timezone = models.CharField(max_length=20, choices=UserConstants.TimeZones.choices(), default=None, null=True, blank=True)
    default_overlay = models.CharField(max_length=30, choices=UserConstants.DefaultOverlay.choices(), default=None, null=True, blank=True)
    user_state = models.CharField(max_length=20, choices=UserConstants.UserState.choices(), default=None, null=True, blank=True)
    session_timeout = models.IntegerField(null=True, blank=True)
    first_login_page = models.CharField(max_length=20, choices=UserConstants.FirstLoginPage.choices(), default=None, null=True, blank=True)
    groups = models.ManyToManyField('group.Group', related_name='users', blank=True, null=True)

    def __str__(self) -> str:
        return self.user.email
    
class UserAccount(CommonModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='account')
    description = models.TextField(null=True, blank=True)
    contact_name = models.CharField(max_length=255, null=True, blank=True)
    contact_phone = models.CharField(max_length=15, null=True, blank=True)
    private_cost = models.FloatField(null=True, blank=True, default=0.0)
    idle_gas_usage = models.FloatField(null=True, blank=True, default=0.0)
    distance_gas_usage = models.FloatField(null=True, blank=True, default=0.0)
    auto_update_interval_for_maps = models.IntegerField(null=True, blank=True, help_text="In seconds")
    drivers_assigned_to_devices = models.BooleanField(default=False)
    enable_map_clustering = models.CharField(max_length=40, choices=UserConstants.MapClustering.choices(), default=UserConstants.MapClustering.OFF.value, null=True, blank=True)
    open_reports_in_new_tab = models.BooleanField(default=False)
    sync_driver_id_from_driver_admin = models.BooleanField(default=False)
    has_snowplows = models.BooleanField(default=False)
    hide_total_rows_in_csv = models.BooleanField(default=False)
    timezone = models.CharField(max_length=20, choices=UserConstants.TimeZones.choices(), default=None, null=True, blank=True)
    speed_units = models.CharField(max_length=20, choices=UserConstants.SpeedUnits.choices(), default=UserConstants.SpeedUnits.MPH.value, null=True, blank=True)
    distance_units = models.CharField(max_length=20, choices=UserConstants.DistanceUnits.choices(), default=UserConstants.DistanceUnits.MILES.value, null=True, blank=True)
    volume_units = models.CharField(max_length=20, choices=UserConstants.VolumeUnits.choices(), default=UserConstants.VolumeUnits.GALLONS.value, null=True, blank=True)
    economy_units = models.CharField(max_length=20, choices=UserConstants.EconomyUnits.choices(), default=UserConstants.EconomyUnits.MPG.value, null=True, blank=True)
    pressure_units = models.CharField(max_length=20, choices=UserConstants.PressureUnits.choices(), default=UserConstants.PressureUnits.KPA.value, null=True, blank=True)
    temperature_units = models.CharField(max_length=20, choices=UserConstants.TemperatureUnits.choices(), default=UserConstants.TemperatureUnits.FAHRENHEIT.value, null=True, blank=True)
    lat_lan_format = models.CharField(max_length=20, choices=UserConstants.LatLonFormat.choices(), default=UserConstants.LatLonFormat.DEGREES.value, null=True, blank=True)
    route_segment_color_rule = models.CharField(max_length=255, null=True, blank=True, default=None)
    route_line_thickness = models.CharField(max_length=20, choices=UserConstants.RouteLineThickness.choices(), default=UserConstants.RouteLineThickness.TWO.value, null=True, blank=True)
    multi_vehicle_map_name = models.CharField(max_length=255, null=True, blank=True)
    device_title = models.CharField(max_length=255, null=True, blank=True)
    device_title_plural = models.CharField(max_length=255, null=True, blank=True)
    device_group_title = models.CharField(max_length=255, null=True, blank=True)
    device_group_title_plural = models.CharField(max_length=255, null=True, blank=True)
    address_title = models.CharField(max_length=255, null=True, blank=True)
    address_title_plural = models.CharField(max_length=255, null=True, blank=True)
    default_login_user_id = models.CharField(max_length=255, null=True, blank=True)
    default_overlay = models.CharField(max_length=30, choices=UserConstants.DefaultOverlay.choices(), default=None, null=True, blank=True)
    maintenance_intervals = models.JSONField(default=UserConstants.UserAccountJSON.MAINTENANCE_INTERVAL_TIMINGS, null=True, blank=True)
    
    harsh_braking = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    harsh_acceleration = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    speeding = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    reverse = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    seatbelt_off = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    harsh_cornering = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    idle_ratio = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    impact_crash_ai = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    cellphone_use_ai = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    distracted_driving_ai = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    smoking_ai = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    possible_fatigue_ai = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)
    obstructed_camera_ai = models.CharField(max_length=20, choices=UserConstants.ZeroToNineInteger.choices(), default=UserConstants.ZeroToNineInteger.Zero.value, null=True, blank=True)

    drinking_eating_ai = models.CharField(max_length=255, null=True, blank=True)
    tailgating_ai = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self) -> str:
        return self.user.email