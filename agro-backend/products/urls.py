from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, login_view

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('login/', login_view, name='login'),
] + router.urls