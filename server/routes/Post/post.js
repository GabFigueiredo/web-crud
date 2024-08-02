const express = require('express')
const postData = require('../../controllers/Post/post')
const router = express.Router()
const { body } = require('express-validator')

router.post('/post', [
    body('nome', 'O campo nome é obrigatório').notEmpty().isString(),
    body('destino', 'O campo destino deve ter entre 4 e 18 caracteres').notEmpty().isLength({ min: 4, max: 18 }),
    body('duracao', 'O campo duração deve ser um número').notEmpty().isNumeric(),
    body('preco', 'O campo preço deve ser um número').notEmpty().isNumeric(),
    body('descricao', 'O campo descrição deve ser uma string entre 100 e 200 caracteres').notEmpty().isString(),
    body('datas_disponiveis', 'O valor de datas_disponiveis tem que ser um string').notEmpty().isString()
], postData, (req, res) => {
    res.status(200).send("Pedidos concluídos")
})

module.exports = router
