import { useCart } from "../context/CartContext";

function Cart() {
 const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1>🛒 Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                width="120"
                style={{ borderRadius: "8px" }}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>${item.price}</p>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button onClick={() => decreaseQuantity(item.id)}>
                    ➖
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>
                    ➕
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "crimson",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px",
  }}
>
  <h2>Total: ${total.toFixed(2)}</h2>

  <button
    onClick={clearCart}
    style={{
      background: "black",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Clear Cart
  </button>
</div>
        </>
      )}
    </div>
  );
}

export default Cart;