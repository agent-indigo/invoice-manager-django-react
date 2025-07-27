"""
Registration serializer
"""
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .user_serializer import UserSerializer
class RegistrationSerializer(ModelSerializer):
    """
    Registration serializer
    """
    class Meta:
        """
        Registration serializer metadata
        """
        model = User
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
    def create(
        self: 'UserSerializer',
        validated_data: dict[
            str,
            object
        ]
    ) -> User:
        user = User.objects.create_user(
            **validated_data
        )
        return user
    def validate(
        self: 'RegistrationSerializer',
        attrs: dict[
            str,
            object
        ]
    ) -> dict[
        str,
        object
    ]:
        if not authenticate(
            username = attrs['username'],
            password = attrs['password']
        ):
            raise ValueError('Invalid credentials')
        return attrs
