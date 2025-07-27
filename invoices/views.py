"""
Invoices app views
"""
from urllib.request import Request
from django.http import HttpResponse
from django.shortcuts import render
# Create your views here.
def index(request: Request) -> HttpResponse:
    """
    React.js client app request handler
    """
    return render(
        request,
        'index.html'
    )
