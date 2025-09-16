"""
User serializer
"""
from rest_framework.serializers import (
    CharField,
    ModelSerializer,
    ValidationError
)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
class UserSerializer(ModelSerializer):
    """
    User Serializer
    """
    newUsername = CharField(
        write_only = True,
        required = False,
        allow_blank = True
    )
    newPassword = CharField(
        write_only = True,
        required = False,
        allow_blank = True
    )
    confirmPassword = CharField(
        write_only = True,
        required = False,
        allow_blank = True
    )
    class Meta:
        """
        User serializer metadata
        """
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'username',
            'newUsername',
            'password',
            'newPassword',
            'confirmPassword',
            'is_superuser',
            'is_staff',
            'date_joined',
            'last_login'
        ]
        read_only_fields = [
            'id',
            'is_superuser',
            'is_staff',
            'date_joined',
            'last_login'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
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
        validated_data: dict
    ):
        """
        Create a new user
        """
        if User.objects.filter(
            username = validated_data.get('username')
        ).exists():
            raise ValidationError({
                'username': "A user with this username already exists."
            })
        if validated_data.get('password') != validated_data.get('confirmPassword'):
            raise ValidationError({
                'password': "Passwords do not match."
            })
        validated_data.pop('confirmPassword')
        if User.objects.filter(
            is_superuser = True
        ).exists():
            return User.objects.create_user(
                **validated_data
            )
        return User.objects.create_superuser(
            **validated_data
        )
    def partial_update(
        self,
        instance: User,
        validated_data: dict
    ):
        """
        Edit a user
        """
        if not 'password' in validated_data or validated_data.get('password') == '':
            raise ValidationError({
                'password': "Password is required."
            })
        if not authenticate(
            username = instance.username,
            password = validated_data.get('password')
        ):
            raise ValidationError({
                'password': "Invalid credentials."
            })
        if 'newUsername' in validated_data and validated_data.get('newUsername') != '':
            if User.objects.filter(
                username = validated_data.get('newUsername')
            ).exists():
                raise ValidationError({
                    'newUsername': "A user with this username already exists."
                })
            instance.username = validated_data.get('newUsername')
            validated_data.pop('newUsername')
        if 'newPassword' in validated_data and validated_data.get('newPassword') != '':
            if validated_data.get('newPassword') != validated_data.get('confirmPassword'):
                raise ValidationError({
                    'newPassword': "Passwords do not match."
                })
            instance.set_password(validated_data.get('newPassword'))
            validated_data.pop('newPassword')
            validated_data.pop('confirmPassword')
        for attr, value in validated_data.items():
            setattr(
                instance,
                attr,
                value
            )
        instance.save()
        return instance
