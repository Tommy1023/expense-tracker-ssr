const express = require('express')
const router = express.Router()
const home = require('../routes/modules/home')
const Record = require('../models/record')



router.use('/', home)

module.exports = router