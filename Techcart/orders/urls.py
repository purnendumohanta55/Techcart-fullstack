from django.urls import path
from .views import place_order, my_orders

urlpatterns = [
    path('orders/place/', place_order),
    path('orders/', my_orders),
]