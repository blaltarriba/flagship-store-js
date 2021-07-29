var uuid = require('uuid');
var Checkout = require('../models/checkout')
var ProductRepository = require('../repositories/product.repository')
var CheckoutRepository = require('../repositories/checkout.repository')

function Do(product_code) {
  let productRepository = new ProductRepository();

  if (productRepository.searchById(product_code) == null) {
    return null;
  }

  let checkout = new Checkout(uuid.v1(), [product_code]);
  checkoutRepository = new CheckoutRepository();
  checkoutRepository.persist(checkout);

  return checkout;
}

module.exports = { Do };