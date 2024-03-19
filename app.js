const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
const products = require("./routes/products");
const home = require("./routes/home");
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.use("/api/products", products);
app.use("/", home);

mongoose
  .connect(
    "mongodb+srv://alperenaktug:Moriarty1579.843@cluster0.ufy6lbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("mongodb bağlantısı kuruldu.");
  })
  .catch((err) => {
    console.log(err);
  });

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageURL: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: Boolean,
});

const Product = mongoose.model("Product", productSchema);

app.listen(3005, () => {
  console.log("listening on port 3000");
});
