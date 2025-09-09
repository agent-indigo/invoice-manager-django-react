"""
API view for creating a superuser if none exists
"""
from urllib.request import Request
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from knox.models import AuthToken
from ..serializers import (
    CreateSuperuserSerializer,
    UserSerializer
)
class CreateSuperuserApiView(GenericAPIView):
    """
    API view for creating a superuser if none exists
    """
    serializer_class = CreateSuperuserSerializer
    def post(
        self: 'CreateSuperuserApiView',
        request: Request
    ) -> Response:
        """
        Superuser creation request handler
        """
        serializer = self.get_serializer(
            data = request.data
        )
        serializer.is_valid(
            raise_exception = True
        )
        user = serializer.save()
        return Response({
            'user': UserSerializer(
                user,
                context = self.get_serializer_context()
            ).data,
            'token': AuthToken.objects.create(user)[1]
        })
