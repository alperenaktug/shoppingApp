const mongoose = require("mongoose");
const Joi = require("joi");
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

function validateProduct(product) {
  const schema = new Joi.object({
    name: Joi.string().min(3).max(30).required(),
    price: Joi.number().required(),
    description: Joi.string(),
    imageURL: Joi.string(),
    isActive: Joi.boolean(),
  });
  return schema.validate(product);
}

const Product = mongoose.model("product", productSchema);

module.exports = { Product, validateProduct };
