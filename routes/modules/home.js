const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  let renderRecords = []
  Record.find()
    .lean()
    .then(records => {
      return Promise.all(Array.from(records, record => {
        return Category.findOne({ _id: record.categoryId })
        .lean()
        .then(category => {
          record.icon = category.icon
          renderRecords.push(record)
        })
      }))
      .then(() => {
        res.render('index', { renderRecords })})
    })
    .catch(err => console.log('some error', err))
})



module.exports = router