const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const app = express();

const productsRoutes = require("./routes/productsApi");
const userRoutes = require("./routes/User");
const indiProductsRouter = require("./routes/IndiProductsApi");

const Product = require("./models/products");
const User = require("./models/Users");



var url = "mongodb://localhost:27017/runawayDB";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connection', () => {
    console.log("Mongoose is connected");
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));



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




app.use("/user", userRoutes);
app.use("/", productsRoutes);
app.use("/", indiProductsRouter);



port = process.env.PORT || 8080;

app.listen(port, function (req, res) {
    console.log(`The Server is running on PORT ${port}`);
});