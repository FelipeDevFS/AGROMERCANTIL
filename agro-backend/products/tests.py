from django.test import TestCase
from rest_framework.test import APIClient
from .models import Product

class ProductAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product1 = Product.objects.create(name="Produto 1", price=100.00)
        self.product2 = Product.objects.create(name="Produto 2", price=200.00)

    def test_get_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_create_product(self):
        data = {'name': 'Produto 3', 'price': 300.00}
        response = self.client.post('/api/products/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Product.objects.count(), 3)

    def test_create_product_invalid(self):
        data = {'name': '', 'price': -10.00}
        response = self.client.post('/api/products/', data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_delete_product(self):
        response = self.client.delete(f'/api/products/{self.product1.id}/')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Product.objects.count(), 1)