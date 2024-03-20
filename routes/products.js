const express = require("express");
const router = express.Router();

const { Product, validateProduct } = require("../models/product");

const products = [
  { id: 1, name: "iphone12", price: 20000 },
  { id: 2, name: "iphone13", price: 30000 },
  { id: 3, name: "iphone14", price: 40000 },
];

router.get("/", async (req, res) => {
  const products = await Product.find();
  // const products = await Product.find({ price: 10000, isActive: true });
  // const products = await Product.find({ isActive: true }).limit(1).select({
  //   name: 1,
  //   price: 1,
  // });

  res.send(products);
});

router.post("", async (req, res) => {
  const { error } = validateProduct(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //nesne oluşturma
  // kayıt ekleme
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageURL: req.body.imageURL,
    isActive: req.body.isActive,
  });
  try {
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", (req, res) => {
  // id ye göre ürün alma
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).send("Aradığınız ürün bulunamadı.");
  }

  // validate
  const { error } = validateProduct(req.body);

  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  product.name = req.body.name;
  product.price = req.body.price;

  res.send(product);
});

router.delete("/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).send("Aradığınız ürün bulunamadı.");
  }

  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send(product);
});

router.get("/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const product = await products.findOne({ _id: express.request.params.id });

  if (!product) {
    return res.status(404).send("Aradığınız ürün bulunamadı.");
  }
  res.send(product);
});

module.exports = router;
