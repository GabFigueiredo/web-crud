const express = require('express')
const router = express.Router()
const path = require('path');
const deleteImage = require('../../controllers/Delete/deleteImage')

// Rota para deletar a imagem
router.delete('/deleteImage/:id', deleteImage)
module.exports = router
