var uuid = require('uuid');
var Checkout = require('../models/checkout')
var Product = require('../models/product')
var ProductRepository = require('../repositories/product.repository')
var CheckoutRepository = require('../repositories/checkout.repository')

function Do(product_code) {
  let productRepository = new ProductRepository()
  let product = productRepository.searchById(product_code)
  if (product == null) {
    return null
  }

  let checkout = new Checkout(uuid.v1(), [product])
  checkoutRepository = new CheckoutRepository()
  checkoutRepository.persist(checkout)

  return checkout
}

module.exports = { Do }