const express = require('express')
const router = express.Router()
const home = require('../routes/modules/home')
const records = require('../routes/modules/records')
const users = require('../routes/modules/users')

router.use('/users', users)
router.use('/records', records)
router.use('/', home)

module.exports = router