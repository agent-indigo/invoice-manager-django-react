"""
Invoice API view set
"""
from urllib.request import Request
from django.db.models import QuerySet
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Invoice
from ..serializers import InvoiceSerializer
class InvoiceApiViewSet(ModelViewSet):
    """
    Invoice API view set
    """
    # pylint: disable = no-member
    queryset = Invoice.objects.none()
    serializer_class = InvoiceSerializer
    permission_classes = [
        IsAuthenticated
    ]
    def get_object(self: 'InvoiceApiViewSet') -> Invoice:
        """
        Get a single invoice
        """
        # pylint: disable = no-member
        return Invoice.objects.get(
            id = self.kwargs.get('pk'),
            user_id = self.request.user.id
        )
    def get_queryset(self: 'InvoiceApiViewSet') -> QuerySet[Invoice]:
        """
        Get all invoices owned by the currently logged in user
        """
        # pylint: disable = no-member
        return Invoice.objects.filter(
            user_id = self.request.user.id
        )
    def perform_create(
        self: 'InvoiceApiViewSet',
        serializer: InvoiceSerializer
    ) -> Invoice:
        """
        Add an invoice
        """
        return serializer.save(
            user_id = self.request.user.id
        )
    def partial_update(
        self: 'InvoiceApiViewSet',
        request: Request,
        *args: tuple[str],
        **kwargs: dict[
            str,
            str
        ]
    ) -> Response:
        """
        Update an invoice
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
        self: 'InvoiceApiViewSet',
        instance: Invoice
    ) -> None:
        """
        Delete an invoice
        """
        instance.delete()
