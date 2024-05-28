
from geozone.models import Geozone
from rest_framework import serializers
from users.api.v1.serializers import UserSerializer


class GeozoneSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    groups = serializers.SerializerMethodField()

    class Meta:
        model = Geozone
        fields = '__all__'
        read_only_fields = ('created_by', )
        extra_kwargs = {
            'organization': {'required': True},
            'zone_id': {'required': True}
        }

    def validate(self, attrs):
        return super().validate(attrs)

    def get_groups(self, obj):
        try:
            from group.api.v1.serializers import SimpleGroupSerializer
            return SimpleGroupSerializer(obj.groups, many=True).data
        except:
            return None