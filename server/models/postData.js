const mongoose = require('mongoose')
const item = require('./schemas/homeModel')

module.exports = async (req, res) => {
    const data = req.body

    newItem = new item({
        nome: data.nome,
        destino: data.destino,
        duracao: data.duracao,
        descricao: data.descricao,
        preco: data.preco,
        datas_disponiveis: data.preco
    })

    try {
        newItem.save()
        console.log('Funcionou')
    } catch {
        res.status(500)
    }

}