"""
User serializer
"""
from rest_framework.serializers import (
    ModelSerializer,
    ValidationError
)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
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
            'first_name',
            'last_name',
            'email',
            'username',
            'newUsername',
            'password',
            'newPassword',
            'confirmPassword',
            'is_superuser',
            'is_staff'
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
        write_only_fields = [
            'newUsername',
            'password',
            'newPassword',
            'confirmPassword'
        ]
        def create(
            self: 'UserSerializer',
            validated_data: object
        ) -> User:
            """
            Create a new user
            """
            if User.objects.filter(
                username = validated_data['username']
            ).exists():
                raise ValidationError({
                    'username': "A user with this username already exists."
                })
            if validated_data['password'] != validated_data['confirmPassword']:
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
    def validate(
        self: 'UserSerializer',
        attrs: object
    ) -> User:
        """
        Validate a user's credentials
        """
        user: User | None = authenticate(
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
    def partial_update(
        self: 'UserSerializer',
        instance: User,
        validated_data: object
    ) -> User:
        """
        Edit a user
        """
        if not 'password' in validated_data or validated_data.get('password') == '':
            raise ValidationError({
                'password': "Password is required."
            })
        if not authenticate(
            username = instance.username,
            password = validated_data['password']
        ):
            raise ValidationError({
                'password': "Invalid credentials."
            })
        if 'newUsername' in validated_data and validated_data.get('newUsername') != '':
            if User.objects.filter(
                username = validated_data['newUsername']
            ).exists():
                raise ValidationError({
                    'newUsername': "A user with this username already exists."
                })
            instance.username = validated_data['newUsername']
            validated_data.pop('newUsername')
        if 'newPassword' in validated_data and validated_data.get('newPassword') != '':
            if validated_data['newPassword'] != validated_data.get('confirmPassword'):
                raise ValidationError({
                    'newPassword': "Passwords do not match."
                })
            instance.set_password(validated_data['newPassword'])
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
