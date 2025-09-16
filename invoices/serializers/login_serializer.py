"""
Login serializer
"""
from rest_framework.serializers import (
    Serializer,
    CharField,
    ValidationError
)
from django.contrib.auth import authenticate
class LoginSerializer(Serializer):
    """
    Login serializer
    """
    username = CharField()
    password = CharField()
    def validate(
        self,
        attrs: dict
    ):
        """
        Validate a user's credentials
        """
        user = authenticate(
            username = attrs.get('username'),
            password = attrs.get('password')
        )
        if not user:
            raise ValidationError({
                'password': "Invalid credentials."
            })
        if not user.is_active:
            raise ValidationError({
                'username': "User is disabled."
            })
        return user
    def create(
        self,
        validated_data
    ):
        """
        Required by Serializer. Not used for login.
        """
        return validated_data
    def update(
        self,
        instance,
        validated_data
    ):
        """
        Required by Serializer. Not used for login.
        """
        return instance
