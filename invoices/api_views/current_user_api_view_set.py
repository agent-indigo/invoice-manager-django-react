"""
API View for retrieving the currently logged in user.
"""
from urllib.request import Request
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..serializers import UserSerializer
class CurrentUserApiViewSet(ModelViewSet):
    """
    API view for retrieving the currently logged in user.
    """
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = UserSerializer
    def get_object(self: 'CurrentUserApiViewSet') -> User:
        """
        Get the currently logged in user.
        """
        return self.request.user
    def partial_update(
            self: 'CurrentUserApiViewSet',
            request: Request,
            *args: tuple[str],
            **kwargs: dict[
                str,
                str
            ]
        ) -> Response:
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
        self: 'CurrentUserApiViewSet',
        instance: User
    ):
        """
        Delete the currently logged in user.
        """
        instance.delete()
