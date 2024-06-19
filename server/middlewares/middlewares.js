const path = require('path')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

// Middlewares
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(cors())
router.use('/files', express.static(path.join(__dirname, 'uploads')))

module.exports = router
