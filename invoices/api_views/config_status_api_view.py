"""
API View for checking if the system is configured (i.e., if a superuser exists).
"""
from django.contrib.auth.models import User
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from ..serializers import UserSerializer
class ConfigStatusApiView(RetrieveAPIView):
    """
    API View for checking if the system is configured (i.e., if a superuser exists).
    """
    permission_classes = [
        AllowAny
    ]
    serializer_class = UserSerializer
    def get_object(self):
        """
        Return the config status.
        """
        return Response({
            "rootExists": User.objects.filter(
                is_superuser = True
            ).exists()
        })
