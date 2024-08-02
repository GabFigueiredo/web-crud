const express = require('express')
const router = express.Router()
const update = require("../../controllers/Put/update")

router.put("/update/:id", update)

module.exports = router