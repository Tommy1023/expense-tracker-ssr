const express = require('express')

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
  res.send('This is my expense_tracker project built with Express.')
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})