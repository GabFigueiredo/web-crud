const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema ({

    nome: {
        type: String, 
        required: true},
    destino: {
        type: String, 
        required: true},
    duracao: {
        type: Number, 
        required: true},
    descricao: {
        type: String, 
        required: true},
    preco: {
        type: Number, 
        required: true},
    datas_disponiveis: {
        type: Array,
        required: true },
    imageId: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Items', itemSchema, 'Items')
