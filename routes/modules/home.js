const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')
const { render } = require('express/lib/response')

router.get('/', (req, res) => {
  Category.find()
  .lean()
  .then(categories => {
    Record.find()
    .lean()
    .then(records => {
      let renderRecords = []
      let totalAmount = 0
      records.forEach(record => totalAmount += record.amount)
      return Promise.all(Array.from(records, record => {
        return Category.findOne({ _id: record.categoryId })
        .lean()
        .then(category => {
          record.icon = category.icon
          renderRecords.push(record)
        })
      }))
      .then(() => {
        res.render('index', { categories, renderRecords, totalAmount })})
      })
    })
    .catch(err => console.log('some error', err))
})


router.get('/sort/:sort', (req, res) => {
  const sort =req.params.sort
  Category.find()
    .lean()
    .then(categories => {
      let selectedCategory = {}
      categories.map((data) => {
        if (data.name === sort) {
          return selectedCategory = data
        }
      })
      Record.find({ categoryId: selectedCategory._id })
        .lean()
        .then(renderRecords => {
          let totalAmount = 0
          renderRecords.forEach(record => {
            totalAmount += record.amount
            record.icon = selectedCategory.icon
          })
          res.render('index', { categories, renderRecords, totalAmount, sort })
        })
    })
    .catch(err => console.log('some error', err))
})


module.exports = router