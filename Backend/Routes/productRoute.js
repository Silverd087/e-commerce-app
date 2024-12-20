const express = require("express");
const productRoute = express.Router();
const {
  getProducts,
  getOneProduct,
  postProduct,
  putProduct,
  deleteProduct,
  updateProductStockAndSold,
} = require("../Controllers/productController");

const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");

productRoute.get("/products", getProducts);
productRoute.get("/products/:id", getOneProduct);
productRoute.post("/products", isAuth, isAutho(["admin"]), postProduct);
productRoute.put("/products/:id", putProduct);
productRoute.delete("/products/:id", isAuth, isAutho(["admin"]), deleteProduct);
productRoute.put("/products/update-stock-sold/:id", updateProductStockAndSold);

module.exports = productRoute;
