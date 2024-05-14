const express = require('express')
const homeData = require('../models/homeData')
const postData = require('../models/postData')
const router = express.Router()

router.get('/data', homeData)

router.post('/post', postData)

module.exports = router