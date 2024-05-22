
from fleet_tag.models import FleetTag
from rest_framework import serializers


class FleetTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = FleetTag
        fields = '__all__'