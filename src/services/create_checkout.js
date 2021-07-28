var uuid = require('uuid');
var Checkout = require('../models/checkout')
var ProductRepository = require('../repositories/product.repository')
var CheckoutRepository = require('../repositories/checkout.repository')

function Do(product_code) {
  productRepository = new ProductRepository();

  if (productRepository.searchById(product_code) == null) {
    return null;
  }

  var checkout = new Checkout(uuid.v1(), [product_code]);
  checkoutRepository = new CheckoutRepository();
  checkoutRepository.persist(checkout);

  return checkout;
}

module.exports = { Do };