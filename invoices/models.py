"""
Listings app SQL table models
"""
from uuid import uuid4
from django.db import models
# Create your models here
class Invoice(models.Model):
    """
    Invoice SQL table model
    """
    class Meta:
        """
        Invoice SQL table model meta class
        """
        verbose_name = 'Invoice'
        verbose_name_plural = f'{verbose_name}s'
        db_table = verbose_name_plural.lower()
    id = models.UUIDField(
        primary_key = True,
        default = uuid4,
        editable = False
    )
    vendor = models.CharField()
    subtotal = models.FloatField()
    hst = models.FloatField()
    total = models.FloatField()
    invoice_id = models.CharField()
    date = models.DateField()
    user_id = models.ForeignKey(
        to = 'auth.User',
        on_delete = models.CASCADE,
        related_name = 'invoices',
        verbose_name = 'invoices'
    )
    created_at = models.DateTimeField(
        auto_now_add = True
    )
    updated_at = models.DateTimeField(
        auto_now = True
    )
