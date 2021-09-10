const express = require('express')
let logger = require('morgan')
let products = require('./controllers/products')
let checkouts = require('./controllers/checkouts')

const app = express()

app.use(logger('dev'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
  res.send('Welcome to Flagship store API v1')
})

app.get('/products', products.getAll)
app.get('/products/:x', products.getById)

app.post('/checkouts', checkouts.create)
app.patch('/checkouts/:x', checkouts.addProduct)
app.delete('/checkouts/:x', checkouts.remove)
app.get('/checkouts/:x/amount', checkouts.getAmount)

module.exports = app