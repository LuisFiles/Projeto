var mongoose = require('mongoose');
var {ratings} = require ('stars-schema');

// Define o esquema para o modelo de cliente
let Schema = mongoose.Schema;

var ClientSchema = new Schema({
    name: {type: String, required: true}, // Nome do cliente 
    email: {type: String, required: true}, // Email do cliente
    password: {type: String, required: true}, // Password do cliente
    role: {type: String, required: true}, // Função do cliente
});

// Cria o modelo do cliente usando o esquema
let Client = mongoose.model('Client', ClientSchema);

// Exporta o modelo do cliente
module.exports = Client;
