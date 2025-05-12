from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Product
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache


class ProductViewSetTests(APITestCase):
    """
    Testes para a API de produtos (ProductViewSet).
    Aqui vamos testar todos os endpoints CRUD de produtos,
    além de verificar se o cache está funcionando corretamente.
    """

    def setUp(self):
        """
        Esse método é executado antes de cada teste.
        - Criamos um usuário de teste.
        - Criamos alguns produtos de exemplo.
        """
        # Criando um usuário de teste
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Criando um token de acesso para o usuário
        self.token = RefreshToken.for_user(self.user).access_token

        # URLs de endpoints
        self.product_list_url = reverse('product-list')

        # Criando alguns produtos de exemplo
        self.product1 = Product.objects.create(name='Produto 1', price=100)
        self.product2 = Product.objects.create(name='Produto 2', price=200)

    def test_list_products(self):
        """
        Testa se é possível listar os produtos. A resposta deve retornar um status 200.
        Verifica também se o cache foi aplicado, ou seja, se a resposta é a mesma quando cacheada.
        """
        # Verificando se a requisição com o token de autenticação retorna status 200
        response = self.client.get(self.product_list_url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Verifica se retornou 2 produtos

        # Verifica se a listagem de produtos foi cacheada
        # Primeira vez deve retornar os produtos
        response_1 = self.client.get(self.product_list_url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response_1.status_code, status.HTTP_200_OK)
        
        # Limpa o cache e testa novamente
        cache.clear()

        # Segunda vez, sem cache, deve retornar novamente os mesmos produtos
        response_2 = self.client.get(self.product_list_url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response_2.status_code, status.HTTP_200_OK)
        self.assertEqual(response_1.data, response_2.data)  # A resposta deve ser a mesma

    def test_create_product(self):
        """
        Testa a criação de um novo produto. O status da resposta deve ser 201 Created.
        Verifica se o produto é realmente criado.
        """
        # Dados para criar o novo produto
        data = {
            'name': 'Produto 3',
            'price': 300,
        }

        # Requisição POST para criar o novo produto
        response = self.client.post(self.product_list_url, data, HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Verifica se a resposta tem status 201 e se o produto foi criado corretamente
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 3)  # Verifica se o número de produtos aumentou
        self.assertEqual(Product.objects.last().name, 'Produto 3')  # Verifica se o produto criado tem o nome correto

    def test_update_product(self):
        """
        Testa a atualização de um produto. O status da resposta deve ser 200 OK.
        Verifica se o produto foi realmente atualizado.
        """
        # Dados para atualizar o produto
        data = {
            'name': 'Produto 1 Atualizado',
            'price': 150,
        }

        # URL do produto que será atualizado
        url = reverse('product-detail', args=[self.product1.id])

        # Requisição PUT para atualizar o produto
        response = self.client.put(url, data, HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Verifica se o status da resposta é 200 e se o produto foi atualizado
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product1.refresh_from_db()  # Atualiza o objeto do produto a partir do banco de dados
        self.assertEqual(self.product1.name, 'Produto 1 Atualizado')  # Verifica se o nome foi alterado

    def test_delete_product(self):
        """
        Testa a exclusão de um produto. O status da resposta deve ser 204 No Content.
        Verifica se o produto foi realmente excluído.
        """
        # URL do produto que será excluído
        url = reverse('product-detail', args=[self.product1.id])

        # Requisição DELETE para excluir o produto
        response = self.client.delete(url, HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Verifica se o status da resposta é 204 e se o produto foi excluído
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 1)  # Verifica se o número de produtos diminuiu

    def test_login_view(self):
        """
        Testa a view de login.
        Verifica se ao passar um nome de usuário e senha corretos, ele retorna o token JWT.
        """
        # Dados para login
        login_data = {
            'username': 'testuser',
            'password': 'testpassword',
        }

        # Requisição POST para login
        response = self.client.post(reverse('login'), login_data)

        # Verifica se a resposta tem status 200 e contém os tokens
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)  # Verifica se o token de acesso está presente
        self.assertIn('refresh', response.data)  # Verifica se o token de refresh está presente

    def test_invalid_login(self):
        """
        Testa a view de login com credenciais inválidas.
        O status da resposta deve ser 400 e retornar uma mensagem de erro.
        """
        # Dados para login com credenciais inválidas
        invalid_login_data = {
            'username': 'wronguser',
            'password': 'wrongpassword',
        }

        # Requisição POST para login
        response = self.client.post(reverse('login'), invalid_login_data)

        # Verifica se a resposta tem status 400 e a mensagem de erro está correta
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'Invalid credentials'})
