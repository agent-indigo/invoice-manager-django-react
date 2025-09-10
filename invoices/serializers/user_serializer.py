"""
User serializer
"""
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
class UserSerializer(ModelSerializer):
    """
    User Serializer
    """
    class Meta:
        """
        User serializer metadata
        """
        model = User
        fields = [
            'id',
            'username',
            'is_superuser',
            'is_staff'
        ]
