import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get search value from URL
  const search = searchParams.get("search") || "";
  const normalizedSearch = search.trim().toLowerCase();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(search);

        console.log("Products received:", data);

        // Handle both array and { products: [] } response
        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : [];

        setProducts(productList);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [search]);

  // Search products
  const filteredProducts = products.filter((product) => {
    if (!normalizedSearch) return true;

    const searchableText = [
      product?.name,
      product?.category,
      product?.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearch);
  });

  // Update search
  const handleSearchChange = (e) => {
    const value = e.target.value;

    if (value.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({ search: value });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "30px 20px 60px",
        boxSizing: "border-box",
      }}
    >
      {/* PAGE TITLE */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 800,
            color: "#111827",
          }}
        >
          Products
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#6B7280",
          }}
        >
          Discover our latest fashion and lifestyle products
        </p>
      </div>

      {/* SEARCH BOX */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "600px",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            style={{
              flex: 1,
              minWidth: 0,
              padding: "14px 18px",
              borderRadius: "999px",
              border: "1px solid #E5E7EB",
              outline: "none",
              fontSize: "15px",
              boxSizing: "border-box",
              background: "#FFFFFF",
            }}
          />

          <button
            onClick={() => {
              if (search.trim()) {
                setSearchParams({
                  search: search.trim(),
                });
              }
            }}
            style={{
              padding: "0 22px",
              border: "none",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, #FB923C, #F97316)",
              color: "#FFFFFF",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* SEARCH RESULT MESSAGE */}
      {search && (
        <div
          style={{
            marginBottom: "25px",
            textAlign: "center",
            color: "#374151",
            fontSize: "16px",
          }}
        >
          Search results for{" "}
          <strong>"{search}"</strong>
        </div>
      )}

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #E5E7EB",
          }}
        >
          <div
            style={{
              fontSize: "45px",
              marginBottom: "15px",
            }}
          >
            🔍
          </div>

          <h2
            style={{
              margin: "0 0 10px",
              color: "#111827",
            }}
          >
            No products found
          </h2>

          <p
            style={{
              color: "#6B7280",
              margin: 0,
            }}
          >
            {search
              ? `We couldn't find any product matching "${search}".`
              : "No products are currently available."}
          </p>

          {search && (
            <button
              onClick={() => setSearchParams({})}
              style={{
                marginTop: "20px",
                padding: "12px 22px",
                border: "none",
                borderRadius: "10px",
                background: "#F97316",
                color: "#FFFFFF",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Show All Products
            </button>
          )}
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id || product._id}
                product={product}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
