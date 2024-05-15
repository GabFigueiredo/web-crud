const express = require('express')
const homeData = require('../models/homeData')
const postData = require('../models/postData')
const router = express.Router()
const { body } = require('express-validator')

router.get('/data', homeData)

router.post('/post', [
            body('nome', 'O campo nome é obrigatório').notEmpty().isString(),
            body('destino', 'O campo destino deve ter entre 4 e 18 caracteres').notEmpty().isLength({min: 4, max: 18}),
            body('duracao', 'O campo duração deve ser um número').notEmpty().isNumeric(),
            body('preco', 'O campo preço deve ser um número').notEmpty().isNumeric(),
            body('descricao', 'O campo descrição deve ser uma string entre 100 e 200 caracteres').notEmpty().isString().isLength({min: 10, max: 200}),
            body('datas_disponiveis').notEmpty().isArray(),
            ], postData)
            

module.exports = router