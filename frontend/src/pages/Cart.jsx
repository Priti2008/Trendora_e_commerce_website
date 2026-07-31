import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { isLoggedIn } from "../utils/auth";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    // Login protection
    if (!isLoggedIn()) {
      alert("Please login to place an order");
      return;
    }

    try {
      await createOrder({
        items: cartItems,
        total: totalAmount,
      });

      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      alert("Failed to place order");
      console.error(err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.name}</h3>

          <p>Price: ₹{item.price}</p>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => decreaseQty(item.id)}>-</button>

            <span>{item.quantity}</span>

            <button onClick={() => increaseQty(item.id)}>+</button>
          </div>

          <p>Subtotal: ₹{item.price * item.quantity}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{totalAmount}</h3>

      <div style={{ marginTop: "20px" }}>
        <button onClick={clearCart} style={{ marginRight: "10px" }}>
          Clear Cart
        </button>

        <button onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;