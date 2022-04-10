const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
})

router.post('/', (req, res) => {
  const userId =  'testUser'//req.user._id
  const { name, date, category, amount } = req.body
  Category.findOne({ name: category })
    .lean()
    .then(category => {
      const categoryId = category._id
      return Record.create({ name, amount, date, userId, categoryId })
      .then(() => res.redirect('/'))
    })
  .catch(err => console.log("some error:", err))
})

module.exports = router