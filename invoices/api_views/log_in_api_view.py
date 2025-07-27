"""
Log in API View
"""
from urllib.request import Request
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from knox.models import AuthToken
from ..serializers import LogInSerializer, UserSerializer
class LogInApiView(GenericAPIView):
    """
    Log in API View
    """
    serializer_class = LogInSerializer
    def post(
        self: 'LogInApiView',
        request: Request
    ) -> Response:
        """
        Log in request handler
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
