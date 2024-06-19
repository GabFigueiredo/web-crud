const express = require('express')
const router = express.Router()
const singleItem = require('../controllers/singleItem')

router.get('/getUpdate/:id', singleItem)

module.exports = router
