from django.db import models
from generics.common_models import CommonModel

# Create your models here.

class Group(CommonModel):
    organization = models.ForeignKey('organization.Organization', on_delete=models.CASCADE, related_name='groups', null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    vehicles = models.ManyToManyField('vehicle.Vehicle', related_name='groups', blank=True, null=True)  
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, related_name='created_groups', null=True, blank=True)

    class Meta:
        verbose_name = "Group"
        verbose_name_plural = "Groups"
        unique_together = ['organization', 'name']

    def __str__(self) -> str:
        return self.name