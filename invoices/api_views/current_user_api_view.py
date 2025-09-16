"""
API View for retrieving the currently logged in user.
"""
from urllib.request import Request
from django.contrib.auth.models import User
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..serializers import UserSerializer
class CurrentUserApiView(RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving the currently logged in user.
    """
    permission_classes = [
        IsAuthenticated
    ]
    serializer_class = UserSerializer
    def get_object(self):
        """
        Get the currently logged in user.
        """
        return self.request.user
    def partial_update(
            self,
            request: Request,
            *args,
            **kwargs
        ):
        """
        Update the currently logged in user.
        """
        serializer = self.get_serializer(
            self.get_object(),
            data = request.data,
            partial = True
        )
        serializer.is_valid(
            raise_exception = True
        )
        self.perform_update(serializer)
        return Response(serializer.data)
    def perform_destroy(
        self,
        instance: User
    ):
        """
        Delete the currently logged in user.
        """
        instance.delete()
