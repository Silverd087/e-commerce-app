const express = require("express");
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productRoute");
const messageRouter = require("./Routes/messageRoute");
const orderRouter = require("./Routes/orderRoute");
const connectDB = require("./Configuration/connectDB");
var cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;

connectDB();
app.use(cors());
app.listen(PORT, (error) => {
  if (error) console.log("Server Failed");
  else console.log(`Server is Running on Port ${PORT}`);
});

app.use(express.json());
app.use("/api", messageRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);
