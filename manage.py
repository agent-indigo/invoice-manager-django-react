#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
from sys import argv
from django.core.management import execute_from_command_line
def main() -> None:
    """Run administrative tasks."""
    os.environ.setdefault(
        'DJANGO_SETTINGS_MODULE',
        'invoices.settings'
    )
    try:
        execute_from_command_line(argv)
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
if __name__ == '__main__':
    main()
