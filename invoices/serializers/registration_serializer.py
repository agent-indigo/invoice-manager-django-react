"""
Registration serializer
"""
from rest_framework.serializers import ModelSerializer, ValidationError
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
            'confirm_password',
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
        """
        Create a new user
        """
        if validated_data['password'] != validated_data['confirm_password']:
            raise ValidationError({
                'password': "Passwords do not match."
            })
        if User.objects.filter(
            username = validated_data['username']
        ).exists():
            raise ValidationError({
                'username': "A user with this username already exists."
            })
        if User.objects.filter(
            email = validated_data['email']
        ).exists():
            raise ValidationError({
                'email': "A user with this email already exists."
            })
        if User.objects.filter(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        ).exists():
            raise ValidationError({
                'name': "A user with this first and last name already exists."
            })
        validated_data.pop('confirm_password')
        if User.objects.filter(
            is_superuser = True
        ).exists():
            return User.objects.create_user(
                **validated_data
            )
        validated_data['username'] = 'root'
        return User.objects.create_superuser(
            **validated_data
        )
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
        """
        Validate the user credentials and log them in.
        """
        if not authenticate(
            username = attrs['username'],
            password = attrs['password']
        ):
            raise ValueError('Invalid credentials')
        return attrs
