const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/orders");
const cartRouter = require("./routes/cart");
const app = express();
const port = 3005;
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected successfully.."))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", authRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
