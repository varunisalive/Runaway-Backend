const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    imgURL: String,
    name: String,
    rating: Number,
    price: Number,
    detail: String
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;