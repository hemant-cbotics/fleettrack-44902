
from group.models import Group
from rest_framework import serializers
from users.api.v1.serializers import UserSerializer
from vehicle.api.v1.serializers import VehicleForGroupSerializer

class SimpleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'organization']

class GroupSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    vehicles = VehicleForGroupSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = '__all__'
        read_only_fields = ('created_by', )
        extra_kwargs = {
            'name': {'required': True},
            'organization': {'required': True},
        }