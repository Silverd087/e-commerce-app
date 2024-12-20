const express = require("express");
const userRoute = express.Router();
const {
  getUsers,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
  signIn,
} = require("../Controllers/userController");

const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");

userRoute.get("/users", getUsers);
userRoute.get("/users/:id", isAuth, isAutho(["user", "admin"]), getOneUser);
userRoute.post("/users", postUser);
userRoute.put("/users/:id", putUser);
userRoute.delete("/users/:id", isAuth, isAutho(["admin"]), deleteUser);

userRoute.post("/SignIn", signIn);
module.exports = userRoute;
