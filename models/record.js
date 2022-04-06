const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  userId:{
    type: String,
    require: true
  },
  categoryId:{
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Record', recordSchema)