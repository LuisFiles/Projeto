var mongoose = require('mongoose');
var {ratings} = require ('stars-schema');

// Define o esquema para o modelo de stock
let Schema = mongoose.Schema;

var StockSchema = new Schema({
    name: {type: String, required: true, unique: true}, //Nome do produto em stock
    number: {type: Number, required: true}, //Número de produtos em stock
    price: {type: Number, required: true}, // Price of the stock (required) // Preço do produto em stock
    category: {type: String, required: true}, // Categoria do produto em stock
    description: {type: String, required: true}, // Descrição do produto em stock
    image: {type: String, required: true},  // Imagem do produto em stock
    rating: {type: Number, required: true} // Avaliação do produto em stock
});

// Cria o modelo de stock usando o esquema
let Stock = mongoose.model('Stock', StockSchema);

// Exporta o modelo de stock
module.exports = Stock;