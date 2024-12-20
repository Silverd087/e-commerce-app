const Order = require("../models/Order");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders && orders.length > 0) {
      res.status(200).json({ orders: orders });
    } else {
      res.status(404).json({ msg: "No orders found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error on getting orders" });
  }
};

const getOneOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const foundOrder = await Order.findById(id);
    if (foundOrder) {
      res.status(200).json({ order: foundOrder });
    } else {
      res.status(404).json({ msg: "No order found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error on retrieving the order" });
  }
};

const postOrder = async (req, res) => {
  const order = req.body;
  try {
    const newOrder = new Order(order);
    console.log(newOrder);
    await newOrder.save();
    res.status(200).json({ order: newOrder, msg: "order successfully added" });
  } catch (error) {
    res.status(500).json({ msg: "error on adding the order" });
  }
};

const putOrder = async (req, res) => {
  const id = req.params.id;
  const order = req.body;
  console.log(order);
  try {
    await Order.findByIdAndUpdate(id, order);
    res.status(200).json({ msg: "update success" });
  } catch (error) {
    res.status(500).json({ msg: "error on updating the order" });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ msg: "delete done" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting the order" });
  }
};
const getLifetimeIncome = async (req, res) => {
  try {
    const orders = await Order.find();
    const lifetimeIncome = orders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );
    res.json({ lifetimeIncome });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};


const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ "user._id": userId });
    if (!orders.length) {
      return res.status(404).json({ msg: "No orders found for this user" });
    }
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  getOrders,
  getOneOrder,
  postOrder,
  putOrder,
  deleteOrder,
  getLifetimeIncome,
  getOrdersByUserId,
};

