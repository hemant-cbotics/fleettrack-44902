
from driver.models import Driver
from rest_framework import serializers
from users.api.v1.serializers import UserSerializer


class DriverSerializer(serializers.ModelSerializer):
    added_by = UserSerializer(read_only=True)

    class Meta:
        model = Driver
        fields = '__all__'
        read_only_fields = ('added_by', )
        extra_kwargs = {
            'organization': {'required': True}
        }