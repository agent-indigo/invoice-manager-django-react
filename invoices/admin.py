"""
Invoices app admin config
"""
from django.contrib.admin import (
    ModelAdmin,
    site
)
from django.urls import reverse
from django.utils.html import format_html
from .models import Invoice
# Register your models here
class InvoiceAdminConfig(ModelAdmin):
    """
    Listings app admin config
    """
    list_display = [
        'vendor',
        'subtotal',
        'hst',
        'total',
        'invoice_id',
        'date',
        'user',
        'created_at',
        'updated_at'
    ]
    list_display_links = [
        'invoice_id',
    ]
    list_filter = [
        'vendor',
        'subtotal',
        'hst',
        'total',
        'invoice_id',
        'date',
        'user_id__username',
        'created_at',
        'updated_at'
    ]
    search_fields = [
        'vendor',
        'subtotal',
        'hst',
        'total',
        'invoice_id',
        'date',
        'user_id__username',
        'created_at',
        'updated_at'
    ]
    list_per_page = 20
    def user(
        self,
        invoice: Invoice
    ):
        """
        Link to the admin page of the user who added the invoice
        """
        return format_html(
            '<a href="{url}">{text}</a>',
            url = reverse(
                'admin:auth_user_change',
                args = [
                    invoice.user_id.id
                ]
            ),
            text = invoice.user_id.username
        )
site.register(
    Invoice,
    InvoiceAdminConfig
)
