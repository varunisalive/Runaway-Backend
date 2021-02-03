const express = require("express");
const Product = require("../models/products.js");

const router = express.Router();

router.get("/products/:prodId", (req, res) => {

    const productId = req.params.id;

    Product.find({
        _id: productId
    }, function (err, foundProduct) {
        if (err) {
            console.log(err)
        } else {
            if (foundProduct) {
                res.json(foundProduct);
            } else {
                console.log("Product not found");
            }
        }
    })
});

module.exports = router;