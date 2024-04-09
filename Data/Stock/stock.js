//Criamos a estrutura da nossa base de dados para o stock

const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var stockSchema = new Schema({
    name: {type: String, required: true, unique: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    rating: {type: Number, required: true},
});

let Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock; // Exporta o modelo Stock para ser utilizado em outros ficheiros