import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="wishlist">❤️</div>

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <span className="category-tag">
          {product.category}
        </span>

        <h2>{product.name}</h2>

        <div className="rating">
          ⭐⭐⭐⭐⭐ <span>(4.8)</span>
        </div>

        <p>{product.description}</p>

        <div className="price-row">
          <h3>${product.price}</h3>

          <span className="stock">
            {product.stock} left
          </span>
        </div>

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