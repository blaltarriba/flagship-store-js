const express = require('express')
let morgan = require('morgan');
let trade = require('./src/controllers/product');
let port = 3080;

const app = express();

app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/", (req, res) => {
  res.send('Welcome to Flagship store API v1')
});

app.get('/product', trade.getAll);
app.post('/products', trade.create);

app.listen(port);
console.log("Listening on port " + port);