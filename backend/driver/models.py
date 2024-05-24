from django.db import models
from generics.common_models import CommonModel
from generics.CONSTANTS import DriverConstants
# Create your models here.

class Driver(CommonModel):
    """
        This model is responsible to store driver details.
    """
    name = models.CharField(max_length=255)
    nick_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length = 30,null=True, blank=True)
    badge_employee_id = models.CharField(max_length=255, null=True, blank=True)
    card_id = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    licence_type = models.CharField(max_length=20, choices=DriverConstants.LicenceType.choices(), default=DriverConstants.LicenceType.NA.value)
    licence_state = models.CharField(max_length=20, choices=DriverConstants.LicenceState.choices(), default=DriverConstants.LicenceState.AL.value)
    licence_number = models.CharField(max_length=255, null=True, blank=True)
    licence_expiry = models.DateTimeField(default=None, null=True, blank=True)
    licence_status = models.CharField(max_length=20, choices=DriverConstants.LicenceStatus.choices(), default=DriverConstants.LicenceStatus.INVALID_DATA.value)
    medical_card_no = models.CharField(max_length=255, null=True, blank=True)
    medical_card_expiry = models.DateTimeField(default=None, null=True, blank=True)
    is_hazmat_certified = models.BooleanField(default=False)
    twic = models.CharField(max_length=255, null=True, blank=True)
    twic_expiry = models.DateTimeField(default=None, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    vehicle_assigned = models.OneToOneField('vehicle.Vehicle', on_delete=models.SET_NULL, related_name='driver', null=True, blank=True)
    added_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, related_name='added_drivers', null=True, blank=True)
    organization = models.ForeignKey('organization.Organization', on_delete=models.CASCADE, related_name='drivers', default=None, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Driver"
        verbose_name_plural = "Drivers"