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

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  Record.findOne({ _id })
  .lean()
  .then( record => {
    Category.find()
    .lean()
    .then(categories => {
      categories.map( category => {
        if (category._id.toString() === record.categoryId.toString()) {
          return categoryName = category.name
        }
      })
      res.render('edit', { record, categories, categoryName }) 
    })
  })
  .catch(err => console.log('some error:', err))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const editRecord = req.body
  Category.findOne({ name: req.body.category })
    .lean()
    .then((category) => {
      editRecord.categoryId = category._id.toString()
      return Record.findOneAndUpdate({ _id }, editRecord)
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log('some error:', err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Record.findOneAndRemove({ _id })
    .then(() => res.redirect('/'))
    .catch(err => console.log('some error:', err))
})

module.exports = router