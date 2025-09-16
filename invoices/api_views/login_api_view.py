"""
Login API View
"""
from urllib.request import Request
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from knox.models import AuthToken
from ..serializers import (
    LoginSerializer,
    UserSerializer
)
class LoginApiView(GenericAPIView):
    """
    Login API View
    """
    serializer_class = LoginSerializer
    def post(
        self,
        request: Request
    ):
        """
        Login request handler
        """
        serializer = self.get_serializer(
            data = request.data
        )
        serializer.is_valid(
            raise_exception = True
        )
        user = serializer.validated_data
        return Response({
            'user': UserSerializer(
                user,
                context = self.get_serializer_context()
            ).data,
            'token': AuthToken.objects.create(user)[1]
        })
