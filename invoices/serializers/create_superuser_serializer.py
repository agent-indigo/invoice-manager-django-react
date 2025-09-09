"""
Serializer for creating a superuser if one does not exist.
"""
from rest_framework.serializers import (
    ModelSerializer,
    ValidationError
)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
class CreateSuperuserSerializer(ModelSerializer):
    """
    Serializer for creating a superuser if one does not exist.
    """
    class Meta:
        """
        CreateSuperuserSerializer metadata
        """
        model = User
        fields = [
            'email',
            'password',
            'confirmPassword',
            'firstName',
            'lastName'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
    def create(
        self: 'CreateSuperuserSerializer',
        validated_data: object
    ) -> User:
        """
        Create a new superuser.
        """
        validated_data['username'] = 'root'
        if User.objects.filter(
            is_superuser = True
        ).exists():
            raise ValidationError({
                'superuser_exists': "A superuser already exists."
            })
        if validated_data['password'] != validated_data['confirmPassword']:
            raise ValidationError({
                'password': "Passwords do not match."
            })
        if User.objects.filter(
            username = validated_data['username']
        ).exists():
            raise ValidationError({
                'username': "A user with this username already exists."
            })
        validated_data.pop('confirmPassword')
        return User.objects.create_superuser(
            **validated_data
        )
    def validate(
        self: 'CreateSuperuserSerializer',
        attrs: object
    ) -> object:
        """
        Validate the new superuser's credentials and log them in.
        """
        if not authenticate(
            username = attrs['username'],
            password = attrs['password']
        ):
            raise ValueError('Invalid credentials')
        return attrs
