import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("upi");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================
  // LOAD CART
  // =========================================

  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart")
      );

      if (Array.isArray(savedCart)) {
        const cart = savedCart.map((item) => ({
          ...item,
          quantity:
            Number(item.quantity) > 0
              ? Number(item.quantity)
              : 1,
        }));

        setItems(cart);
      }
    } catch (error) {
      console.error("Unable to load cart", error);
    }
  }, []);

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setError("");
  };

  // =========================================
  // PRICE CONVERTER
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

    const result = Number(cleaned);

    return Number.isFinite(result)
      ? result
      : 0;
  };

  // =========================================
  // FORMAT PRICE
  // =========================================

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // =========================================
  // SUBTOTAL
  // =========================================

  const subtotal = items.reduce((sum, item) => {
    const price = getPrice(item.price);
    const quantity = Number(item.quantity) || 1;

    return sum + price * quantity;
  }, 0);

  // =========================================
  // DELIVERY
  // =========================================

  const delivery = subtotal >= 500 ? 0 : 49;

  // =========================================
  // APPLY COUPON
  // =========================================

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "TRENDORA10") {
      const newDiscount = Math.round(subtotal * 0.1);

      setDiscount(newDiscount);
      setError("");
    } else {
      setDiscount(0);
      setError("Invalid coupon code.");
    }
  };

  // =========================================
  // TOTAL
  // =========================================

  const total = Math.max(
    0,
    subtotal + delivery - discount
  );

  // =========================================
  // TOTAL ITEMS
  // =========================================

  const totalItems = items.reduce((sum, item) => {
    return sum + (Number(item.quantity) || 1);
  }, 0);

  // =========================================
  // PLACE ORDER
  // =========================================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      setError(
        "Please complete your delivery address."
      );
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      setError(
        "Please enter a valid 6-digit PIN code."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      /*
        IMPORTANT:

        If your backend has an order API,
        connect it here.

        Example:

        await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            address: form,
            payment,
            subtotal,
            delivery,
            discount,
            total,
          }),
        });
      */

      const order = {
        id: "ORD-" + Date.now(),
        items,
        address: form,
        payment,
        subtotal,
        delivery,
        discount,
        total,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
      );

      localStorage.removeItem("cart");

      navigate("/success");

    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
            Your cart is empty
          </h1>

          <p style={emptyText}>
            Add some products before proceeding
            to checkout.
          </p>

          <Link
            to="/"
            style={shopButton}
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div style={page}>

      <div style={container}>

        {/* =====================================
            HEADER
        ===================================== */}

        <div style={header}>

          <div>
            <h1 style={heading}>
              Checkout
            </h1>

            <p style={subtitle}>
              Complete your order securely
            </p>
          </div>

          <div style={secureHeader}>
            🔒 Secure Checkout
          </div>

        </div>

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <div style={errorBox}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>

          <div style={layout}>

            {/* =================================
                LEFT SIDE
            ================================= */}

            <div>

              {/* DELIVERY ADDRESS */}

              <div style={card}>

                <div style={sectionHeader}>

                  <div style={sectionNumber}>
                    1
                  </div>

                  <div>
                    <h2 style={sectionTitle}>
                      Delivery Address
                    </h2>

                    <p style={sectionSubtitle}>
                      Where should we deliver your order?
                    </p>
                  </div>

                </div>

                {/* FULL NAME */}

                <label style={label}>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  style={input}
                />

                {/* PHONE */}

                <label style={label}>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength="10"
                  style={input}
                />

                {/* ADDRESS */}

                <label style={label}>
                  Address
                </label>

                <textarea
                  name="address"
                  placeholder="House number, street, area"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                  style={textarea}
                />

                {/* CITY + STATE */}

                <div style={twoColumns}>

                  <div>

                    <label style={label}>
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      style={input}
                    />

                  </div>

                  <div>

                    <label style={label}>
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={form.state}
                      onChange={handleChange}
                      style={input}
                    />

                  </div>

                </div>

                {/* PIN */}

                <label style={label}>
                  PIN Code
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="6-digit PIN code"
                  value={form.pincode}
                  onChange={handleChange}
                  maxLength="6"
                  style={input}
                />

              </div>

              {/* =================================
                  PAYMENT
              ================================= */}

              <div style={card}>

                <div style={sectionHeader}>

                  <div style={sectionNumber}>
                    2
                  </div>

                  <div>
                    <h2 style={sectionTitle}>
                      Payment Method
                    </h2>

                    <p style={sectionSubtitle}>
                      Choose your preferred payment option
                    </p>
                  </div>

                </div>

                {/* UPI */}

                <label
                  style={
                    payment === "upi"
                      ? selectedPayment
                      : paymentOption
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === "upi"}
                    onChange={(e) =>
                      setPayment(e.target.value)
                    }
                  />

                  <div style={paymentIcon}>
                    UPI
                  </div>

                  <div style={paymentInfo}>

                    <strong>
                      UPI
                    </strong>

                    <span>
                      Google Pay, PhonePe, Paytm
                    </span>

                  </div>

                </label>

                {/* CARD */}

                <label
                  style={
                    payment === "card"
                      ? selectedPayment
                      : paymentOption
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === "card"}
                    onChange={(e) =>
                      setPayment(e.target.value)
                    }
                  />

                  <div style={paymentIcon}>
                    💳
                  </div>

                  <div style={paymentInfo}>

                    <strong>
                      Credit / Debit Card
                    </strong>

                    <span>
                      Visa, Mastercard, RuPay
                    </span>

                  </div>

                </label>

                {/* COD */}

                <label
                  style={
                    payment === "cod"
                      ? selectedPayment
                      : paymentOption
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={(e) =>
                      setPayment(e.target.value)
                    }
                  />

                  <div style={paymentIcon}>
                    💵
                  </div>

                  <div style={paymentInfo}>

                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order arrives
                    </span>

                  </div>

                </label>

              </div>

            </div>

            {/* =================================
                RIGHT SIDE
            ================================= */}

            <div style={rightColumn}>

              {/* ORDER SUMMARY */}

              <div style={summaryCard}>

                <h2 style={summaryTitle}>
                  Order Summary
                </h2>

                <p style={itemsText}>
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"}{" "}
                  in your cart
                </p>

                {/* PRODUCTS */}

                <div style={productsList}>

                  {items.map((item) => {

                    const price =
                      getPrice(item.price);

                    const quantity =
                      Number(item.quantity) || 1;

                    const itemTotal =
                      price * quantity;

                    return (
                      <div
                        key={item.id}
                        style={summaryProduct}
                      >

                        <div style={summaryProductImage}>

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              style={smallImage}
                            />
                          ) : (
                            "🛍️"
                          )}

                        </div>

                        <div style={summaryProductInfo}>

                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            Qty: {quantity}
                          </span>

                        </div>

                        <strong>
                          {formatPrice(itemTotal)}
                        </strong>

                      </div>
                    );
                  })}

                </div>

                <div style={divider}></div>

                {/* COUPON */}

                <label style={label}>
                  Discount Coupon
                </label>

                <div style={couponRow}>

                  <input
                    type="text"
                    placeholder="Enter coupon"
                    value={coupon}
                    onChange={(e) =>
                      setCoupon(e.target.value)
                    }
                    style={couponInput}
                  />

                  <button
                    type="button"
                    onClick={applyCoupon}
                    style={applyButton}
                  >
                    Apply
                  </button>

                </div>

                {discount > 0 && (
                  <p style={couponSuccess}>
                    ✓ 10% discount applied
                  </p>
                )}

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
                        ? freeText
                        : normalText
                    }
                  >
                    {delivery === 0
                      ? "FREE"
                      : formatPrice(delivery)}
                  </strong>
                </div>

                {/* DISCOUNT */}

                {discount > 0 && (
                  <div style={summaryRow}>

                    <span>
                      Discount
                    </span>

                    <strong style={discountText}>
                      -{formatPrice(discount)}
                    </strong>

                  </div>
                )}

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

                {/* PLACE ORDER */}

                <button
                  type="submit"
                  disabled={loading}
                  style={
                    loading
                      ? disabledButton
                      : placeOrderButton
                  }
                >
                  {loading
                    ? "Placing Order..."
                    : "Place Order →"}
                </button>

                {/* SECURITY */}

                <div style={secureBox}>
                  🔒 Your payment information is secure
                </div>

              </div>

              {/* FREE DELIVERY */}

              <div style={benefitCard}>

                <div style={benefitIcon}>
                  🚚
                </div>

                <div>

                  <strong>
                    Free Delivery
                  </strong>

                  <p>
                    Free delivery on orders above ₹500
                  </p>

                </div>

              </div>

              {/* RETURN */}

              <div style={benefitCard}>

                <div style={benefitIcon}>
                  ↩️
                </div>

                <div>

                  <strong>
                    Easy Returns
                  </strong>

                  <p>
                    Simple and hassle-free returns
                  </p>

                </div>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}


/* =====================================================
   PAGE
===================================================== */

const page = {
  minHeight: "100vh",
  background: "#f7f9fc",
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
  maxWidth: "1180px",
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
  margin: "0",
  fontSize: "34px",
  fontWeight: "800",
  color: "#111827",
};


const subtitle = {
  margin: "7px 0 0",
  color: "#6b7280",
  fontSize: "15px",
};


const secureHeader = {
  padding: "10px 15px",
  background: "#ecfdf5",
  color: "#15803d",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "700",
};


/* =====================================================
   ERROR
===================================================== */

const errorBox = {
  padding: "13px 16px",
  marginBottom: "20px",
  borderRadius: "10px",
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#dc2626",
  fontSize: "14px",
};


/* =====================================================
   LAYOUT
===================================================== */

const layout = {
  display: "grid",
  gridTemplateColumns:
    "minmax(0, 1fr) 390px",
  gap: "25px",
  alignItems: "start",
};


/* =====================================================
   CARD
===================================================== */

const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "18px",
  padding: "28px",
  marginBottom: "22px",
  boxShadow:
    "0 8px 25px rgba(15, 23, 42, 0.05)",
};


/* =====================================================
   SECTION HEADER
===================================================== */

const sectionHeader = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "25px",
};


const sectionNumber = {
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  background: "#eff6ff",
  color: "#2563eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
};


const sectionTitle = {
  margin: "0",
  fontSize: "20px",
  color: "#111827",
};


const sectionSubtitle = {
  margin: "4px 0 0",
  fontSize: "13px",
  color: "#6b7280",
};


/* =====================================================
   LABEL
===================================================== */

const label = {
  display: "block",
  marginBottom: "7px",
  color: "#374151",
  fontSize: "13px",
  fontWeight: "700",
};


/* =====================================================
   INPUT
===================================================== */

const input = {
  width: "100%",
  height: "48px",
  padding: "0 14px",
  marginBottom: "18px",
  boxSizing: "border-box",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  outline: "none",
  background: "#ffffff",
  color: "#111827",
  fontSize: "14px",
};


const textarea = {
  width: "100%",
  padding: "13px 14px",
  marginBottom: "18px",
  boxSizing: "border-box",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  outline: "none",
  resize: "vertical",
  background: "#ffffff",
  color: "#111827",
  fontSize: "14px",
  fontFamily: "Arial, sans-serif",
};


const twoColumns = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
};


/* =====================================================
   PAYMENT
===================================================== */

const paymentOption = {
  display: "flex",
  alignItems: "center",
  gap: "13px",
  padding: "15px",
  marginBottom: "12px",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  cursor: "pointer",
  boxSizing: "border-box",
};


const selectedPayment = {
  ...paymentOption,
  border: "2px solid #2563eb",
  background: "#eff6ff",
};


const paymentIcon = {
  width: "42px",
  height: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  background: "#f1f5f9",
  color: "#2563eb",
  fontSize: "12px",
  fontWeight: "800",
};


const paymentInfo = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  color: "#111827",
  fontSize: "14px",
};


const paymentInfoSpan = {
  color: "#6b7280",
};


/* =====================================================
   RIGHT COLUMN
===================================================== */

const rightColumn = {
  position: "sticky",
  top: "20px",
};


/* =====================================================
   SUMMARY
===================================================== */

const summaryCard = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "18px",
  padding: "25px",
  boxShadow:
    "0 8px 25px rgba(15, 23, 42, 0.06)",
};


const summaryTitle = {
  margin: "0",
  fontSize: "21px",
  fontWeight: "800",
  color: "#111827",
};


const itemsText = {
  margin: "6px 0 20px",
  color: "#6b7280",
  fontSize: "13px",
};


/* =====================================================
   PRODUCTS
===================================================== */

const productsList = {
  display: "flex",
  flexDirection: "column",
  gap: "13px",
};


const summaryProduct = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "13px",
};


const summaryProductImage = {
  width: "48px",
  height: "48px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9px",
  background: "#f1f5f9",
  overflow: "hidden",
};


const smallImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};


const summaryProductInfo = {
  flex: "1",
  minWidth: "0",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};


const divider = {
  height: "1px",
  background: "#e5e7eb",
  margin: "20px 0",
};


/* =====================================================
   COUPON
===================================================== */

const couponRow = {
  display: "flex",
  gap: "8px",
};


const couponInput = {
  flex: "1",
  height: "44px",
  padding: "0 12px",
  boxSizing: "border-box",
  border: "1px solid #d1d5db",
  borderRadius: "9px",
  outline: "none",
  fontSize: "13px",
};


const applyButton = {
  border: "none",
  padding: "0 15px",
  borderRadius: "9px",
  background: "#111827",
  color: "#ffffff",
  fontWeight: "700",
  cursor: "pointer",
};


const couponSuccess = {
  margin: "8px 0 0",
  color: "#16a34a",
  fontSize: "12px",
  fontWeight: "600",
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


const freeText = {
  color: "#16a34a",
};


const normalText = {
  color: "#111827",
};


const discountText = {
  color: "#16a34a",
};


/* =====================================================
   TOTAL
===================================================== */

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  color: "#111827",
  fontSize: "19px",
  fontWeight: "800",
};


/* =====================================================
   PLACE ORDER
===================================================== */

const placeOrderButton = {
  width: "100%",
  height: "52px",
  border: "none",
  borderRadius: "11px",
  background:
    "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow:
    "0 8px 20px rgba(37, 99, 235, 0.25)",
};


const disabledButton = {
  ...placeOrderButton,
  opacity: 0.65,
  cursor: "not-allowed",
};


/* =====================================================
   SECURITY
===================================================== */

const secureBox = {
  textAlign: "center",
  marginTop: "15px",
  color: "#6b7280",
  fontSize: "11px",
};


/* =====================================================
   BENEFITS
===================================================== */

const benefitCard = {
  display: "flex",
  alignItems: "center",
  gap: "13px",
  marginTop: "13px",
  padding: "15px",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "13px",
};


const benefitIcon = {
  width: "38px",
  height: "38px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9px",
  background: "#eff6ff",
};


const benefitCardStrong = {
  fontSize: "13px",
};


const benefitCardP = {
  margin: "4px 0 0",
  color: "#6b7280",
  fontSize: "11px",
};


/* =====================================================
   EMPTY CART
===================================================== */

const emptyCard = {
  maxWidth: "500px",
  margin: "100px auto",
  padding: "55px 30px",
  textAlign: "center",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "20px",
  boxShadow:
    "0 15px 40px rgba(15, 23, 42, 0.07)",
};


const emptyIcon = {
  fontSize: "60px",
  marginBottom: "18px",
};


const emptyTitle = {
  margin: "0",
  fontSize: "28px",
};


const emptyText = {
  color: "#6b7280",
  margin: "12px 0 25px",
};


const shopButton = {
  display: "inline-block",
  padding: "13px 23px",
  borderRadius: "10px",
  background: "#2563eb",
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: "700",
};