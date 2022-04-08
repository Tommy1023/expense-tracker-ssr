if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')

const CATEGORIES = [
  {
    name: '家居物業',
    icon: 'fa-solid fa-house'
  },
  {
    name: '交通出行',
    icon: 'fa-solid fa-van-shuttle'
  },
  {
    name: '休閒娛樂',
    icon: 'fa-solid fa-face-grin-beam'
  },
  {
    name: '餐飲食品',
    icon: 'fa-solid fa-utensils'
  },
  {
    name: '其他',
    icon: 'fa-solid fa-pen'
  }
]

db.once('open', () => {
  Promise.all(Array.from(CATEGORIES, category => {
    return Category.create(category)
  }))
  .catch(err => console.log('error', err))
  .finally(() => {
    console.log('categorySeeder done!')
    process.exit()
  })
})