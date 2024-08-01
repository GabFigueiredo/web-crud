const express = require('express')
const router = express.Router()

const homeRouter = require('./post')
const imageRouter = require('./image')
const dataRouter = require('./data')
const getImageRouter = require('./getImage')
const deleteRouter = require('./delete')
const updateRouter = require('./getUpdate')
const update = require('./update')
const deleteImage = require('./deleteImage')

// Routes
router.use('/', homeRouter)
router.use('/', imageRouter)
router.use('/', dataRouter)
router.use('/', getImageRouter)
router.use('/', deleteRouter)
router.use('/', updateRouter)
router.use('/', update)
router.use('/', deleteImage)

module.exports = router
