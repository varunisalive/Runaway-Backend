const express = require("express");
const Product = require("../models/products.js");

const router = express.Router();

//routes
router.get("/products", (req, res) => {

Product.find({}, function(err, foundProducts){
    if(err){
        console.log(err);
    } else {
        if(foundProducts){
            res.json(foundProducts);
        } else {
            console.log("Products not found");
        }
    }
});
});

module.exports = router;