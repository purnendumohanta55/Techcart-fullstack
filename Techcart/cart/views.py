from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .models import Cart, CartItem
from products.models import Product


def get_or_create_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


# 🔥 ADD TO CART
@api_view(['POST'])
@permission_classes([])
def add_to_cart(request):
    user = request.user if request.user.is_authenticated else User.objects.first()

    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))

    product = get_object_or_404(Product, id=product_id)
    cart = get_or_create_cart(user)

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity

    cart_item.save()

    return Response({"message": "Product added to cart"})


# 🔥 VIEW CART
@api_view(['GET'])
@permission_classes([])
def view_cart(request):
    user = request.user if request.user.is_authenticated else User.objects.first()

    cart = get_or_create_cart(user)
    items = CartItem.objects.filter(cart=cart)

    data = []
    for item in items:
        data.append({
            "product_id": item.product.id,
            "product_name": item.product.name,
            "quantity": item.quantity
        })

    return Response(data)


# 🔥 UPDATE
@api_view(['PUT'])
@permission_classes([])
def update_cart_item(request):
    user = request.user if request.user.is_authenticated else User.objects.first()

    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity'))

    cart = get_or_create_cart(user)

    cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
    cart_item.quantity = quantity
    cart_item.save()

    return Response({"message": "Quantity updated"})


# 🔥 REMOVE
@api_view(['DELETE'])
@permission_classes([])
def remove_from_cart(request, product_id):
    user = request.user if request.user.is_authenticated else User.objects.first()

    cart = get_or_create_cart(user)

    CartItem.objects.filter(cart=cart, product_id=product_id).delete()

    return Response({"message": "Item removed"})