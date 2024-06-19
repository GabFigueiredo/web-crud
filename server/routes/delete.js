const express = require('express')
const router = express.Router()
const deleteItem = require('../controllers/delete')

router.delete('/delete/:id', deleteItem)

module.exports = router
