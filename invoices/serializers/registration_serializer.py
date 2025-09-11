"""
Registration serializer
"""
from rest_framework.serializers import (
    ModelSerializer,
    ValidationError
)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
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
            'first_name',
            'last_name',
            'username',
            'email',
            'password',
            'confirmPassword'
        ]
        write_only_fields = [
            'password',
        ]
    def create(
        self: 'RegistrationSerializer',
        validated_data: object
    ) -> User:
        """
        Create a new user.
        """
        if not User.objects.filter(
            is_superuser = True
        ).exists():
            raise ValidationError({
                'no_superuser': "A superuser must be created first."
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
        return User.objects.create_user(
            **validated_data
        )
    def validate(
        self: 'RegistrationSerializer',
        attrs: object
    ) -> object:
        """
        Validate the new user's credentials and log them in.
        """
        if not authenticate(
            username = attrs['username'],
            password = attrs['password']
        ):
            raise ValueError('Invalid credentials')
        return attrs
