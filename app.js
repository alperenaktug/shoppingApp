const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const products = [
  { id: 1, name: "iphone12", price: 20000 },
  { id: 2, name: "iphone13", price: 30000 },
  { id: 3, name: "iphone14", price: 40000 },
];

app.get("/", (req, res) => {
  res.send(products[0]);
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.post("/api/products", (req, res) => {
  // Validations doğrulaması :
  // if (!req.body.name || req.body.name.length < 4) {
  //   res
  //     .status(400)
  //     .send("Ürün adı bilgisini en az 3 karakter olarak girmelisiniz!");
  //   return;
  // }

  const { error } = validateProduct(req.body);

  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(product);
  res.send(product);
});

app.put("/api/products/:id", (req, res) => {
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

app.delete("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).send("Aradığınız ürün bulunamadı.");
  }

  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send(product);
});

app.get("/api/products/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const product = products.find((p) => p.id == req.params.id);

  if (!product) {
    return res.status(404).send("Aradığınız ürün bulunamadı.");
  }
  res.send(product);
});

function validateProduct(product) {
  const schema = new Joi.object({
    name: Joi.string().min(3).max(30).required(),
    price: Joi.number().required(),
  });
  return schema.validate(product);
}

app.listen(3000, () => {
  console.log("listening on port 3000");
});
