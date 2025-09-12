"""
Invoices app views
"""
from django.shortcuts import render
# Create your views here.
def index(request):
    """
    React.js client app request handler
    """
    return render(
        request,
        'index.html'
    )
