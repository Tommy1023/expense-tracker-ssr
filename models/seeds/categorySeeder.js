if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')

const CATEGORYS = [
  {
    name: '家居物業',
    image: "https://fontawesome.com/icons/home?style=solid"
  },
  {
    name: '交通出行',
    image: "https://fontawesome.com/icons/shuttle-van?style=solid"
  },
  {
    name: '休閒娛樂',
    image: "https://fontawesome.com/icons/grin-beam?style=solid",
  },
  {
    name: '餐飲食品',
    image: "https://fontawesome.com/icons/utensils?style=solid",
  },
  {
    name: '其他',
    image: "https://fontawesome.com/icons/pen?style=solid"
  }
]

db.once('open', () => {
  console.log('DB open')
  Promise.all(Array.from(CATEGORYS, category => {
    return Category.create(category)
  }))
  .catch(err => console.log('error', err))
  .finally(() => {
    console.log('categorySeeder done!')
    process.exit()
  })
})