const express = require('express')
const router = express.Router()
const home = require('../routes/modules/home')
const records = require('../routes/modules/records')
const users = require('../routes/modules/users')
const { authenticator } = require('../middleware/auth')


router.use('/users', users)
router.use('/records',authenticator, records)
router.use('/',authenticator, home)

module.exports = router