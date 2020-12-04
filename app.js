const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const app = express();

var url = "mongodb://localhost:27017/runawayDB";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connection', () => {
    console.log("Mongoose is connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));

const productsSchema = new mongoose.Schema({
    imgURL: String,
    name: String,
    rating: Number,
    price: Number
});

const Product = mongoose.model("Product", productsSchema);

// MongoClient.connect(url, function (err, db) {
//     if (err) {
//         console.log(err);
//     } else {
//         var shoes = [
//             
//         ];

//         db.collection("products").insertMany(shoes, function (err, data) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(data.ops);
//             } db.close();
//         });
//         
//     }
    
// })



app.get("/products", function (req, res) {

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

port = process.env.PORT || 8080;

app.listen(port, function (req, res) {
    console.log(`The Server is running on PORT ${port}`);
});