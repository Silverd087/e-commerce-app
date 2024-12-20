const express = require("express");
const orderRoute = express.Router();
const {
  getOrders,
  getOneOrder,
  postOrder,
  putOrder,
  deleteOrder,
  getLifetimeIncome,
  getOrdersByUserId,
} = require("../Controllers/orderController");

orderRoute.get("/orders", getOrders);
orderRoute.get("/orders/lifetime-income", getLifetimeIncome);
orderRoute.get("/orders/:id", getOneOrder);
orderRoute.get("/orders/user/:userId", getOrdersByUserId);
orderRoute.post("/orders", postOrder);
orderRoute.put("/orders/:id", putOrder);
orderRoute.delete("/orders/:id", deleteOrder);

module.exports = orderRoute;
