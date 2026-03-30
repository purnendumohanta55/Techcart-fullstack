from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from .models import Product
from .serializers import ProductSerializer

# Pagination: 6 products per page
class ProductPagination(PageNumberPagination):
    page_size = 6
    page_query_param = 'page'

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    # Filter by category
    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')  # ?category=smartphones
        if category:
            queryset = queryset.filter(category__name__iexact=category)
        return queryset