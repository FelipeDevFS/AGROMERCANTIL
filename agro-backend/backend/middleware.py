import logging

logger = logging.getLogger('django.request')

class LogAllRequestsMiddleware:
    def __init__(self, get_response):  # Corrigido: __init__ com underscores
        self.get_response = get_response

    def __call__(self, request):  # Corrigido: __call__ com underscores
        response = self.get_response(request)
        logger.info(f'{request.method} {request.path} -> {response.status_code}')
        return response
