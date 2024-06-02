const express = require('express')
const homeData = require('../models/homeData')
const router = express.Router()

router.get('/data', homeData)

module.exports = router