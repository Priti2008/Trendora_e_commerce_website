const express = require("express");
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Get All Products
router.get("/", getAllProducts);

// Get Product By ID
router.get("/:id", getProductById);

// Add Product
router.post("/", addProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;