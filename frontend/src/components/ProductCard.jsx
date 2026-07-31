import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/productCard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <h3>₹{product.price}</h3>

        <p><strong>Category:</strong> {product.category}</p>

        <p><strong>Stock:</strong> {product.stock}</p>

        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;