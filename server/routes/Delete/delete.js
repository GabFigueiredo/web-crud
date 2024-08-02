const express = require('express')
const router = express.Router()
const deleteItem = require('../../controllers/Delete/delete')

router.delete('/delete/:id', deleteItem)

module.exports = router
