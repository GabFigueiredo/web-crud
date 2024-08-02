const express = require('express')
const data = require('../../controllers/Get/data')
const router = express.Router()

router.get('/data', data)

module.exports = router
