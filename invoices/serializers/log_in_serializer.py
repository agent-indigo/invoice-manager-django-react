"""
Serializer for logging in a user
"""
from rest_framework.serializers import CharField, Serializer, ValidationError
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
class LogInSerializer(Serializer):
    """
    Serializer for logging in a user
    """
    username = CharField()
    password = CharField()
    def validate(
        self: 'LogInSerializer',
        attrs: dict[
            str,
            str
        ]
      ) -> User:
        """
        Log in request handler
        """
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise ValidationError(
            'Invalid credentials.'
        )
    def create(
        self: 'LogInSerializer',
        validated_data: object
    ) -> User:
        """
        Required by BaseSerializer, not used for login.
        """
        return User.objects.create(**validated_data)
    def update(
        self: 'LogInSerializer',
        instance: User,
        validated_data: object
    ) -> User:
        """
        Required by BaseSerializer, not used for login.
        """
        for attr, value in validated_data.items():
            setattr(
                instance,
                attr,
                value
            )
        instance.save()
        return instance
