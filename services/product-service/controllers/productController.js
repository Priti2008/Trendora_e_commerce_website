const pool = require("../config/db");

const fallbackProducts = [
  {
    id: 1,
    name: "Air Max Elite",
    description: "Premium sneakers with lightweight comfort.",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: "Sneakers",
    stock: 12,
  },
  {
    id: 2,
    name: "Street Runner",
    description: "Everyday running shoes with a streetwear style.",
    price: 4599,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    category: "Sneakers",
    stock: 15,
  },
  {
    id: 3,
    name: "Urban Force",
    description: "Modern fashion sneakers built for daily wear.",
    price: 5199,
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800&q=80",
    category: "Sneakers",
    stock: 9,
  },
  {
    id: 4,
    name: "Pulse Watch",
    description: "Minimal lifestyle watch for clean everyday styling.",
    price: 7999,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    stock: 7,
  },
  {
    id: 5,
    name: "Premium Backpack",
    description: "Durable backpack for commute, college, and travel.",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    category: "Bags",
    stock: 18,
  },
  {
    id: 6,
    name: "Urban Sunglasses",
    description: "Lightweight sunglasses with a bold urban look.",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    stock: 20,
  },
  {
    id: 7,
    name: "Classic Leather Jacket",
    description: "Soft faux leather jacket with a clean premium finish.",
    price: 6499,
    image:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80",
    category: "Apparel",
    stock: 10,
  },
  {
    id: 8,
    name: "Oversized Cotton Hoodie",
    description: "Relaxed hoodie made for casual streetwear layering.",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    category: "Apparel",
    stock: 22,
  },
  {
    id: 9,
    name: "Slim Fit Denim Jeans",
    description: "Stretch denim jeans with a sharp everyday fit.",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    category: "Apparel",
    stock: 16,
  },
  {
    id: 10,
    name: "Minimal White Sneakers",
    description: "Clean low-top sneakers for smart casual outfits.",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    category: "Sneakers",
    stock: 14,
  },
  {
    id: 11,
    name: "Performance Runner Pro",
    description: "Breathable running shoes with responsive cushioning.",
    price: 5799,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
    category: "Sneakers",
    stock: 11,
  },
  {
    id: 12,
    name: "Canvas Weekend Tote",
    description: "Roomy canvas tote bag for shopping and short trips.",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    category: "Bags",
    stock: 25,
  },
  {
    id: 13,
    name: "Travel Duffel Bag",
    description: "Spacious duffel bag with durable travel-ready storage.",
    price: 3299,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    category: "Bags",
    stock: 13,
  },
  {
    id: 14,
    name: "Everyday Graphic Tee",
    description: "Soft cotton t-shirt with a modern graphic print.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    category: "Apparel",
    stock: 30,
  },
  {
    id: 15,
    name: "Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV protection.",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    stock: 19,
  },
  {
    id: 16,
    name: "Analog Field Watch",
    description: "Rugged analog watch with a timeless field design.",
    price: 4299,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    stock: 8,
  },
  {
    id: 17,
    name: "Knitted Beanie",
    description: "Warm knitted beanie for winter streetwear looks.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    stock: 24,
  },
  {
    id: 18,
    name: "Athletic Track Pants",
    description: "Lightweight track pants for training and daily comfort.",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1506629905607-d9ef1b0d2762?auto=format&fit=crop&w=800&q=80",
    category: "Apparel",
    stock: 17,
  },
];

const filterProducts = (products, search = "") => {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) {
    return products;
  }

  return products.filter((product) =>
    [product.name, product.category, product.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch)
  );
};

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    await pool.query(
      `INSERT INTO products
      (name, description, price, image, category, stock)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, description, price, image, category, stock]
    );

    res.status(201).json({
      message: "Product Added Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  const search = req.query.search || "";

  try {
    const values = [];
    let query = "SELECT * FROM products";

    if (search.trim()) {
      values.push(`%${search.trim()}%`);
      query += `
        WHERE name ILIKE $1
           OR category ILIKE $1
           OR description ILIKE $1
      `;
    }

    query += " ORDER BY id ASC";

    const result = await pool.query(
      query,
      values
    );

    const products =
      result.rows.length > 0
        ? result.rows
        : filterProducts(fallbackProducts, search);

    res.status(200).json(products);
  } catch (err) {
    console.error("Product fetch failed, using fallback products:", err.message);
    res.status(200).json(filterProducts(fallbackProducts, search));
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category, stock } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name=$1,
           description=$2,
           price=$3,
           image=$4,
           category=$5,
           stock=$6
       WHERE id=$7
       RETURNING *`,
      [name, description, price, image, category, stock, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product Updated Successfully",
      product: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
