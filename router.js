const express = require ('express');
let RouterStock = require('./Server/stock');
let RouterClient = require('./Server/client');
let RouterProduct = require('./Server/product');



function initialize() {
     let apl = express();

     api.use("/api", RouterStock);
     api.use("/api", RouterClient);
     api.use("/api", RouterProduct);


     return api;
 }


 module.exports = {
     initialize : initialize,
 };