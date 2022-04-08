const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.use(express.static('public'))
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true })) //bodyParser
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})