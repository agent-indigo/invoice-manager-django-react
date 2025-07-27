FROM python:latest
WORKDIR /invoice-manager-web
COPY . .
RUN python3 -m venv .venv
RUN source .venv/bin/activate && \
    pip install -r requirements.txt && \
    pip install gunicorn && \
    python manage.py collectstatic && \
    python manage.py migrate
EXPOSE 443
CMD [".venv/bin/gunicorn", "--bind", "0.0.0.0:443", "invoices.wsgi:application"]