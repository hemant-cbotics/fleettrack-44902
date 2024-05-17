
from vehicle.models import Vehicle
from rest_framework import serializers
from users.api.v1.serializers import UserSerializer
from driver.api.v1.serializers import DriverSerializer

class VehicleForGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    added_by = UserSerializer(read_only=True)
    driver = serializers.SerializerMethodField()
    groups = serializers.SerializerMethodField()

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
        
    def get_groups(self, obj):
        try:
            from group.api.v1.serializers import SimpleGroupSerializer
            return SimpleGroupSerializer(obj.groups, many=True).data
        except:
            return None