"""
Registration API View
"""
from urllib.request import Request
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from knox.models import AuthToken
from ..serializers import UserSerializer
class RegistrationApiView(GenericAPIView):
    """
    Registration API View
    """
    serializer_class = UserSerializer
    def post(
        self: 'RegistrationApiView',
        request: Request
    ) -> Response:
        """
        Registration request handler
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
