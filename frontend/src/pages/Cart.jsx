import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);

  // =========================================
  // LOAD CART
  // =========================================

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart")) || [];

      const cart = saved.map((item) => ({
        ...item,
        quantity:
          Number(item.quantity) > 0
            ? Number(item.quantity)
            : 1,
      }));

      setItems(cart);
    } catch (error) {
      console.error("Error loading cart:", error);
      setItems([]);
    }
  }, []);

  // =========================================
  // GET PRICE
  // =========================================

  const getPrice = (price) => {
    if (typeof price === "number") {
      return price;
    }

    if (!price) {
      return 0;
    }

    const cleaned = String(price)
      .replace(/₹/g, "")
      .replace(/,/g, "")
      .replace(/[^\d.]/g, "");

    const number = Number(cleaned);

    return Number.isFinite(number) ? number : 0;
  };

  // =========================================
  // FORMAT PRICE
  // =========================================

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // =========================================
  // REMOVE ITEM
  // =========================================

  const removeItem = (id) => {
    const updated = items.filter(
      (item) => item.id !== id
    );

    setItems(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  // =========================================
  // CLEAR CART
  // =========================================

  const clearCart = () => {
    setItems([]);

    localStorage.removeItem("cart");
  };

  // =========================================
  // INCREASE QUANTITY
  // =========================================

  const increaseQuantity = (id) => {
    const updated = items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              (Number(item.quantity) || 1) + 1,
          }
        : item
    );

    setItems(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  // =========================================
  // DECREASE QUANTITY
  // =========================================

  const decreaseQuantity = (id) => {
    const updated = items
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                (Number(item.quantity) || 1) - 1,
            }
          : item
      )
      .filter(
        (item) => Number(item.quantity) > 0
      );

    setItems(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  // =========================================
  // SUBTOTAL
  // =========================================

  const subtotal = items.reduce(
    (sum, item) => {
      const price = getPrice(item.price);
      const quantity =
        Number(item.quantity) || 1;

      return sum + price * quantity;
    },
    0
  );

  // =========================================
  // DELIVERY
  // =========================================

  const delivery =
    subtotal >= 500 || subtotal === 0
      ? 0
      : 49;

  // =========================================
  // TOTAL
  // =========================================

  const total = subtotal + delivery;

  // =========================================
  // TOTAL ITEMS
  // =========================================

  const totalItems = items.reduce(
    (sum, item) =>
      sum + (Number(item.quantity) || 1),
    0
  );

  // =========================================
  // EMPTY CART
  // =========================================

  if (items.length === 0) {
    return (
      <div style={page}>
        <div style={emptyCard}>

          <div style={emptyIcon}>
            🛒
          </div>

          <h1 style={emptyTitle}>
            Your Cart is Empty
          </h1>

          <p style={emptyText}>
            You haven't added anything to your
            shopping cart yet.
          </p>

          <Link
            to="/"
            style={continueButton}
          >
            ← Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  // =========================================
  // MAIN CART
  // =========================================

  return (
    <div style={page}>

      <div style={container}>

        {/* =====================================
            HEADER
        ===================================== */}

        <div style={header}>

          <div>
            <h1 style={heading}>
              Shopping Cart
            </h1>

            <p style={subtitle}>
              Review your items before checkout
            </p>
          </div>

          <button
            onClick={clearCart}
            style={clearButton}
          >
            Clear Cart
          </button>

        </div>

        {/* =====================================
            MAIN CONTENT
        ===================================== */}

        <div style={layout}>

          {/* ===================================
              PRODUCTS
          =================================== */}

          <div>

            {items.map((item) => {

              const price = getPrice(item.price);

              const quantity =
                Number(item.quantity) || 1;

              const itemTotal =
                price * quantity;

              return (
                <div
                  key={item.id}
                  style={productCard}
                >

                  {/* PRODUCT IMAGE */}

                  <div style={imageBox}>

                    {item.image ||
                    item.imageUrl ? (
                      <img
                        src={
                          item.image ||
                          item.imageUrl
                        }
                        alt={item.name}
                        style={productImage}
                      />
                    ) : (
                      <div style={noImage}>
                        🛍️
                      </div>
                    )}

                  </div>

                  {/* PRODUCT DETAILS */}

                  <div style={productDetails}>

                    <h2 style={productName}>
                      {item.name}
                    </h2>

                    <p style={priceText}>
                      {formatPrice(price)}
                    </p>

                    {/* QUANTITY */}

                    <div style={quantitySection}>

                      <span style={quantityLabel}>
                        Quantity
                      </span>

                      <div style={quantityBox}>

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                          style={quantityButton}
                        >
                          −
                        </button>

                        <span
                          style={quantityNumber}
                        >
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                          style={quantityButton}
                        >
                          +
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* ITEM TOTAL + REMOVE */}

                  <div style={productRight}>

                    <strong style={itemTotalText}>
                      {formatPrice(itemTotal)}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.id)
                      }
                      style={removeButton}
                    >
                      Remove
                    </button>

                  </div>

                </div>
              );
            })}

            {/* CONTINUE SHOPPING */}

            <Link
              to="/"
              style={continueShopping}
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* ===================================
              ORDER SUMMARY
          =================================== */}

          <div style={summaryCard}>

            <h2 style={summaryTitle}>
              Order Summary
            </h2>

            <p style={itemsCount}>
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>

            <div style={divider}></div>

            {/* SUBTOTAL */}

            <div style={summaryRow}>

              <span>
                Subtotal
              </span>

              <strong>
                {formatPrice(subtotal)}
              </strong>

            </div>

            {/* DELIVERY */}

            <div style={summaryRow}>

              <span>
                Delivery
              </span>

              <strong
                style={
                  delivery === 0
                    ? freeDelivery
                    : undefined
                }
              >
                {delivery === 0
                  ? "FREE"
                  : formatPrice(delivery)}
              </strong>

            </div>

            <div style={divider}></div>

            {/* TOTAL */}

            <div style={totalRow}>

              <span>
                Total
              </span>

              <strong>
                {formatPrice(total)}
              </strong>

            </div>

            {/* CHECKOUT */}

            <Link
              to="/checkout"
              style={checkoutButton}
            >
              Proceed to Checkout
              <span>
                →
              </span>
            </Link>

            {/* SECURITY */}

            <div style={secureText}>
              🔒 Secure checkout
            </div>

            {/* FREE DELIVERY MESSAGE */}

            <div style={deliveryBox}>

              🚚

              <div>
                <strong>
                  Free delivery
                </strong>

                <p>
                  On orders above ₹500
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   PAGE
===================================================== */

const page = {
  minHeight: "100vh",
  background: "#f7f8fa",
  color: "#111827",
  fontFamily:
    "Arial, Helvetica, sans-serif",
  padding: "40px 20px",
  boxSizing: "border-box",
};


/* =====================================================
   CONTAINER
===================================================== */

const container = {
  width: "100%",
  maxWidth: "1150px",
  margin: "0 auto",
};


/* =====================================================
   HEADER
===================================================== */

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "28px",
};


const heading = {
  margin: 0,
  fontSize: "34px",
  fontWeight: "800",
  color: "#111827",
};


const subtitle = {
  marginTop: "8px",
  color: "#6b7280",
  fontSize: "14px",
};


/* =====================================================
   CLEAR BUTTON
===================================================== */

const clearButton = {
  border: "none",
  background: "#fff1f2",
  color: "#e11d48",
  padding: "11px 17px",
  borderRadius: "9px",
  fontWeight: "700",
  cursor: "pointer",
};


/* =====================================================
   LAYOUT
===================================================== */

const layout = {
  display: "grid",
  gridTemplateColumns:
    "minmax(0, 1fr) 350px",
  gap: "24px",
  alignItems: "start",
};


/* =====================================================
   PRODUCT CARD
===================================================== */

const productCard = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "18px",
  marginBottom: "15px",
  boxShadow:
    "0 5px 18px rgba(15, 23, 42, 0.04)",
};


/* =====================================================
   PRODUCT IMAGE
===================================================== */

const imageBox = {
  width: "125px",
  height: "125px",
  flexShrink: 0,
  borderRadius: "12px",
  overflow: "hidden",
  background: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};


const productImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};


const noImage = {
  fontSize: "42px",
};


/* =====================================================
   PRODUCT DETAILS
===================================================== */

const productDetails = {
  flex: 1,
  minWidth: 0,
};


const productName = {
  margin: "0 0 9px",
  fontSize: "19px",
  fontWeight: "700",
  color: "#111827",
};


const priceText = {
  margin: "0 0 17px",
  fontSize: "16px",
  fontWeight: "700",
  color: "#2563eb",
};


/* =====================================================
   QUANTITY
===================================================== */

const quantitySection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};


const quantityLabel = {
  color: "#6b7280",
  fontSize: "13px",
};


const quantityBox = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  overflow: "hidden",
};


const quantityButton = {
  width: "32px",
  height: "30px",
  border: "none",
  background: "#f8fafc",
  color: "#111827",
  fontSize: "18px",
  cursor: "pointer",
};


const quantityNumber = {
  width: "32px",
  textAlign: "center",
  fontSize: "13px",
  fontWeight: "700",
};


/* =====================================================
   PRODUCT RIGHT
===================================================== */

const productRight = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "space-between",
  alignSelf: "stretch",
  minWidth: "90px",
};


const itemTotalText = {
  color: "#111827",
  fontSize: "16px",
};


/* =====================================================
   REMOVE
===================================================== */

const removeButton = {
  border: "none",
  background: "transparent",
  color: "#dc2626",
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
  padding: "5px",
};


/* =====================================================
   CONTINUE SHOPPING
===================================================== */

const continueShopping = {
  display: "inline-block",
  marginTop: "8px",
  color: "#2563eb",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "700",
};


/* =====================================================
   SUMMARY CARD
===================================================== */

const summaryCard = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "24px",
  boxShadow:
    "0 8px 25px rgba(15, 23, 42, 0.05)",
  position: "sticky",
  top: "20px",
};


const summaryTitle = {
  margin: 0,
  fontSize: "21px",
  fontWeight: "800",
};


const itemsCount = {
  margin: "7px 0 0",
  color: "#6b7280",
  fontSize: "13px",
};


/* =====================================================
   DIVIDER
===================================================== */

const divider = {
  height: "1px",
  background: "#e5e7eb",
  margin: "20px 0",
};


/* =====================================================
   SUMMARY ROW
===================================================== */

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
  color: "#4b5563",
  fontSize: "14px",
};


const freeDelivery = {
  color: "#16a34a",
};


/* =====================================================
   TOTAL
===================================================== */

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "20px",
  fontWeight: "800",
  color: "#111827",
};


/* =====================================================
   CHECKOUT BUTTON
===================================================== */

const checkoutButton = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  boxSizing: "border-box",
  marginTop: "22px",
  padding: "14px 18px",
  borderRadius: "11px",
  background:
    "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "700",
  boxShadow:
    "0 8px 20px rgba(37, 99, 235, 0.2)",
};


/* =====================================================
   SECURITY
===================================================== */

const secureText = {
  textAlign: "center",
  marginTop: "15px",
  color: "#6b7280",
  fontSize: "11px",
};


/* =====================================================
   DELIVERY BOX
===================================================== */

const deliveryBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "18px",
  padding: "12px",
  background: "#f0fdf4",
  borderRadius: "10px",
  color: "#166534",
  fontSize: "12px",
};


const deliveryBoxP = {
  margin: "3px 0 0",
  color: "#4b5563",
  fontSize: "10px",
};


/* =====================================================
   EMPTY CART
===================================================== */

const emptyCard = {
  maxWidth: "500px",
  margin: "100px auto",
  padding: "55px 30px",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow:
    "0 10px 35px rgba(15, 23, 42, 0.06)",
};


const emptyIcon = {
  fontSize: "60px",
  marginBottom: "15px",
};


const emptyTitle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "800",
};


const emptyText = {
  color: "#6b7280",
  fontSize: "14px",
  margin:
    "10px auto 25px",
};


const continueButton = {
  display: "inline-block",
  background: "#2563eb",
  color: "#ffffff",
  padding: "13px 22px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "700",
  fontSize: "14px",
};