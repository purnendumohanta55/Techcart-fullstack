import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cart/");
      const data = await res.json();

      console.log(data);
      setCartItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ❌ REMOVE ITEM
  const removeItem = async (productId) => {
    await fetch(`http://127.0.0.1:8000/api/cart/remove/${productId}/`, {
      method: "DELETE",
    });

    fetchCart();
  };

  // ➕➖ UPDATE QUANTITY
  const updateQuantity = async (productId, quantity) => {
    await fetch("http://127.0.0.1:8000/api/cart/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
      }),
    });

    fetchCart();
  };

  return (
    <div>
      <h1>Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <p>Empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.product_id}>
            <h3>{item.product_name}</h3>
            <p>Qty: {item.quantity}</p>

            <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</button>
            <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>-</button>

            <button onClick={() => removeItem(item.product_id)}>
              Remove ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;