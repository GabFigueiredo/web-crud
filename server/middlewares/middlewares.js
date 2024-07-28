const path = require('path')
const express = require('express')
const router = express.Router()

router.use('/files', express.static(path.join(__dirname, 'uploads')))

module.exports = router