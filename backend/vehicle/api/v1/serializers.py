
from vehicle.models import Vehicle
from rest_framework import serializers
from users.api.v1.serializers import UserSerializer
from driver.api.v1.serializers import DriverSerializer


class VehicleSerializer(serializers.ModelSerializer):
    added_by = UserSerializer(read_only=True)
    driver = serializers.SerializerMethodField()

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
    
    def get_driver(self, obj):
        try:
            return DriverSerializer(obj.driver).data
        except:
            return None