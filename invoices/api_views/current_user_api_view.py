"""
API View for retrieving the currently logged in user.
"""
from django.contrib.auth.models import User
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import UserSerializer
class CurrentUserApiView(RetrieveAPIView):
    """
    API view for retrieving the currently logged in user.
    """
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = UserSerializer
    def get_object(self: 'CurrentUserApiView') -> User:
        return self.request.user
