var uuid = require('uuid');
var Checkout = require('../models/checkout')

function create(request, response) {
  const { product_code } = request.body

  products = ['PEN', 'TSHIRT', 'MUG']

  if (!products.includes(product_code)) {
    return response.status(404).json(
      {
        message: `Product ${product_code} not found`
      });
  }

  var checkout = new Checkout(uuid.v1(), [product_code]);

  response.status(200).json(checkout);
}

module.exports = { create };