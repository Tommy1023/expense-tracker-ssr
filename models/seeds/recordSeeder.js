if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user')
const Category = require('../category')
const Record = require('../record')
const recordList = require('../../records.json').records

const SEED_USERS = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
    expenses: recordList.slice(0, 2)
  },
  {
    name: '美冴',
    email: 'user2@example.com',
    password: '87654321',
    expenses: recordList.slice(2, 5)
  }
]

db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        return Promise.all(Array.from(seedUser.expenses, expense => {
          return Category.findOne({ name: expense.category })
            .then(category => {
              expense.categoryId = category._id
              expense.userId = user._id
              return Record.create(expense)
            })
        }))
      })
  }))
  .then(() => console.log('recordSeeder done!'))
  .catch(err => console.log('some error', err))
  .finally(() => process.exit())
})