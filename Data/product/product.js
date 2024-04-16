var mongoose = require('mongoose');
var {ratings} = require ('stars-schema');

// Define o esquema para o modelo de stock
let Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, unique: true}, // Nome do produto no stock 
    number: {type: Number, required: true}, // Número do produto no stock
    price: {type: Number, required: true}, // Preço do produto no stock
    category: {type: String, required: true}, // Categoria do produto no stock
    description: {type: String, required: true}, // Descrição do produto no stock
    image: {type: String, required: true}, // Imagem do produto no stock
    rating: {type: Number, required: true} // Avaliação do produto no stock
});

// Cria o modelo de stock usando o esquema
let Product = mongoose.model('Product', ProductSchema);

// Exporta o modelo de stock
module.exports = Product;