"""
API View for checking if the system is configured (i.e., if a superuser exists).
"""
from django.contrib.auth.models import User
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
class ConfigStatusApiView(GenericAPIView):
    """
    API View for checking if the system is configured (i.e., if a superuser exists).
    """
    permission_classes = [
        AllowAny
    ]
    def get(
        self,
        request,
        *args,
        **kwargs
    ):
        """
        Return the config status.
        """
        return Response({
            "rootExists": User.objects.filter(
                is_superuser = True
            ).exists()
        })
