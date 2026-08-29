const pool = require("../config/db");

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
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
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