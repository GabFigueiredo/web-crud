const mongoose = require('mongoose')
const item = require('./schemas/homeModel')
const { validationResult } = require('express-validator')

module.exports = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const data = req.body
    console.log("AAAAAA")
    console.log(data)

    newItem = new item({
        nome: data.nome,
        destino: data.destino,
        duracao: data.duracao,
        descricao: data.descricao,
        preco: data.preco,
        datas_disponiveis: data.datas_disponiveis
    })

    try {
        newItem.save()
        res.status(200).send(data)
    } catch {
        res.status(500)
    }

}