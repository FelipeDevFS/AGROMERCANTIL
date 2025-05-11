from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price']

    def validate(self, data):
        if not data.get('name'):
            raise serializers.ValidationError("O campo 'name' é obrigatório.")
        if not data.get('price') or data['price'] < 0:
            raise serializers.ValidationError("O campo 'price' é obrigatório e deve ser maior ou igual a zero.")
        return data