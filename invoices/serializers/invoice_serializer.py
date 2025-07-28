"""
Invoice serializer
"""
from rest_framework.serializers import ModelSerializer
from ..models import Invoice
class InvoiceSerializer(ModelSerializer):
    """
    Invoice serializer
    """
    class Meta:
        """
        Invoice serializer meta class
        """
        model = Invoice
        fields = '__all__'
        read_only_fields = [
            'id',
            'user_id',
            'created_at',
            'updated_at'
        ]
