const express = require("express");
const app = express();

const mongoose = require("mongoose");

const products = require("./routes/products");
const categories = require("./routes/categories");
const home = require("./routes/home");

app.use(express.json());

app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/", home);

const username = "";
const password = "";
const database = "";

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
