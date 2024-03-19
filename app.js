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

const username = "alperenaktug";
const password = "Moriarty1579.843";
const database = "shopdb";

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.ufy6lbx.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("mongodb bağlantısı kuruldu.");
  } catch (error) {
    console.log(err);
  }
})();

app.listen(3005, () => {
  console.log("listening on port 3000");
});
