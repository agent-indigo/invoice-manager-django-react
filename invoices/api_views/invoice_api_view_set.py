"""
Invoice API view set
"""
from django.db.models import QuerySet
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from ..models import Invoice
from ..serializers import InvoiceSerializer
class InvoiceApiViewSet(ModelViewSet):
    """
    Invoice API view set
    """
    serializer_class = InvoiceSerializer
    permission_classes = [
        IsAuthenticated
    ]
    def get_object(self: 'InvoiceApiViewSet') -> Invoice:
        """
        Get a single invoice
        """
        return Invoice.objects.get(
            id = self.kwargs.get('pk'),
            user_id = self.request.user.id
        )
    def get_queryset(self: 'InvoiceApiViewSet') -> QuerySet[Invoice]:
        """
        Get all invoices owned by the currently logged in user
        """
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
    def perform_update(
        self: 'InvoiceApiViewSet',
        serializer: InvoiceSerializer
    ) -> Invoice:
        return serializer.update(
            id = self.kwargs.get('pk'),
            user_id = self.request.user.id
        )
    def perform_destroy(
        self: 'InvoiceApiViewSet',
        instance: Invoice
    ) -> None:
        Invoice.objects.delete(
            id = self.kwargs.get('pk'),
            user_id = self.request.user.id
        )
