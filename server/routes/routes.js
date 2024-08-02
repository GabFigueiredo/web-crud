const express = require('express')
const router = express.Router()

// Get Routes
const dataRouter = require('./Get/data')
const getImageRouter = require('./Get/getImage')
const updateRouter = require('./Get/singleItem')

// Delete Routes
const deleteRouter = require('./Delete/delete')
const deleteImage = require('./Delete/deleteImage')

// Post Routes
const homeRouter = require('./Post/post')
const imageRouter = require('./Post/image')

// Put Routes
const update = require('./Put/update')

// Get
router.use('/', dataRouter)
router.use('/', getImageRouter)
router.use('/', updateRouter)

// Delete
router.use('/', deleteRouter)
router.use('/', deleteImage)

// Post
router.use('/', homeRouter)
router.use('/', imageRouter)

// Put
router.use('/', update)

module.exports = router
