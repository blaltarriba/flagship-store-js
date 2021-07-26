var uuid = require('uuid');
var Checkout = require('../models/checkout')
var ProductRepository = require('../repositories/product.repository')
var CheckoutRepository = require('../repositories/checkout.repository')

function create(request, response) {
  const { product_code } = request.body

  productRepository = new ProductRepository();

  if (productRepository.searchById(product_code) == null) {
    return response.status(404).json(
      {
        message: `Product ${product_code} not found`
      });
  }

  var checkout = new Checkout(uuid.v1(), [product_code]);
  checkoutRepository = new CheckoutRepository();
  checkoutRepository.persist(checkout);

  response.status(200).json(checkout);
}

function addProduct(request, response) {
  const { product } = request.body
  const checkoutId = request.params.x

  productRepository = new ProductRepository();
  if (productRepository.searchById(product) == null) {
    return response.status(422).json(
      {
        message: `Product ${product} not found`
      });
  }

  checkoutRepository = new CheckoutRepository();
  if (checkoutRepository.searchById(checkoutId) == null) {
    return response.status(404).json(
      {
        message: `Checkout ${checkoutId} not found`
      });
  }

  // var checkout = new Checkout(uuid.v1(), [product_code]);
  // checkoutRepository = new CheckoutRepository();
  // checkoutRepository.Persist(checkout);

  response.status(204).json();
}

module.exports = { create, addProduct };