
from vehicle.models import Vehicle
from rest_framework import serializers
from users.api.v1.serializers import UserSerializer


class VehicleSerializer(serializers.ModelSerializer):
    added_by = UserSerializer(read_only=True)

    class Meta:
        model = Vehicle
        fields = '__all__'
        read_only_fields = ('added_by', )
        extra_kwargs = {
            'organization': {'required': True},
            'vehicle_make': {'required': True},
            'vehicle_model': {'required': True},
            'vin': {'required': True},
        }