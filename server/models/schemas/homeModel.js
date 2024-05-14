const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema ({

    nome: {
        type: String, 
        required: true},
    destino: {
        type: String, 
        required: true},
    duracao: {
        type: String, 
        required: true},
    descricao: {
        type: String, 
        required: true},
    preco: {
        type: String, 
        required: true},
    datas_disponiveis: {
        type: Array,
        required: true },
})

module.exports = mongoose.model('ItemsModel', itemSchema, 'Items')
