const express = require('express')
const homeData = require('../controllers/homeData')
const router = express.Router()

router.get('/data', homeData)

module.exports = router
