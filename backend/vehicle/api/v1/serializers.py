
from vehicle.models import Vehicle
from rest_framework import serializers
from users.api.v1.serializers import UserSerializer


class VehicleSerializer(serializers.ModelSerializer):
    added_by = UserSerializer(read_only=True)

    class Meta:
        model = Vehicle
        fields = '__all__'
        read_only_fields = ('added_by', )