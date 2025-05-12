from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.core.cache import cache

from .models import Product
from .serializers import ProductSerializer

# ViewSet para produtos
class ProductViewSet(viewsets.ModelViewSet):
    """
    Essa classe é uma ViewSet baseada em Modelos (ModelViewSet).
    Isso quer dizer que ela já vem com as operações prontas para:
    - Listar produtos (GET)
    - Criar produtos (POST)
    - Visualizar produto específico (GET com ID)
    - Atualizar produtos (PUT/PATCH)
    - Deletar produtos (DELETE)
    
    Redução de código, aproveitando a estrutura do DRF.
    """

    queryset = Product.objects.all()  # Diz qual modelo vamos manipular (a tabela Product)
    serializer_class = ProductSerializer  # Define como os dados vão ser convertidos p/ JSON
    permission_classes = [permissions.IsAuthenticated]  # Somente usuários autenticados podem acessar

    # Aqui estamos colocando cache de 10 minutos apenas na listagem de produtos
    @method_decorator(cache_page(60 * 10))  # 60 segundos * 10 = 10 minutos
    def list(self, request, *args, **kwargs):
        """
        Sobrescrevemos o método 'list' para aplicar cache.
        Ele será usado quando alguém fizer GET em /api/products/.
        """
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        """
        Método chamado automaticamente ao criar um produto.
        Aqui salvamos e limpamos o cache para garantir que a listagem futura esteja atualizada.
        """
        serializer.save()
        cache.clear()

    def perform_update(self, serializer):
        """
        Chamado quando um produto é editado (PUT/PATCH).
        Após salvar, limpamos o cache.
        """
        serializer.save()
        cache.clear()

    def perform_destroy(self, instance):
        """
        Chamado quando um produto é excluído.
        Limpamos o cache depois da exclusão.
        """
        instance.delete()
        cache.clear()

# View de login (não faz parte do ViewSet acima)
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Essa é uma view simples (função) que trata o login.
    Recebe username e password, autentica, e devolve tokens JWT.
    """
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        # Se login der certo, geramos e retornamos tokens JWT
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    # Se der errado, avisamos o cliente
    return Response({'error': 'Invalid credentials'}, status=400)
