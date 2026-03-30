# from django.urls import path
# from .views import ProductListCreateView

# urlpatterns = [
#     path('', ProductListCreateView.as_view()),
# ]

from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')

urlpatterns = router.urls