const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();

mongoose.connect("mongodb://localhost:27017/runawayDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(morgan('tiny'));

app.use("/", function(req, res){
   const data = {
       date: 30/11/2020
   } 
   res.json(data);
});

port = process.env.PORT || 8080;

app.listen(port, function(req, res){
    console.log(`The Server is running on PORT ${port}`);
});