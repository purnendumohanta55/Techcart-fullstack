from django.urls import path
from .views import add_to_cart, view_cart, update_cart_item, remove_from_cart

urlpatterns = [
    path('cart/add/', add_to_cart),
    path('cart/', view_cart),
    path('cart/update/', update_cart_item),
    path('cart/remove/<int:product_id>/', remove_from_cart),
]