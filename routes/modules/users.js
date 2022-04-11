const express = require("express")
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符!' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已被註冊過!' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => {
        req.logout()
        res.redirect('/users/login')
      })
      .catch(err => console.log('some error:', err))
  })
    .catch(err => console.log('some error:', err))
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  })
)

router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/users/login')
})

module.exports = router