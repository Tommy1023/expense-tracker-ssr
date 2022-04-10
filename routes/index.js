const express = require('express')
const router = express.Router()
const home = require('../routes/modules/home')
const records = require('../routes/modules/records')


router.use('/records', records)
router.use('/', home)

module.exports = router