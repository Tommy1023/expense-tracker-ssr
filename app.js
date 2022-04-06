const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const PORT = 3000

app.use(express.static('public'))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/new', (req, res) => {
  res.render('new')
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})