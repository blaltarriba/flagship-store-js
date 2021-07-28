var uuid = require('uuid');
var Checkout = require('../models/checkout')
var ProductRepository = require('../repositories/product.repository')
var CheckoutRepository = require('../repositories/checkout.repository')
var CreateCheckoutService = require('../services/create_checkout')

function create(request, response) {
  const { product_code } = request.body

  checkout = CreateCheckoutService.Do(product_code)
  if (checkout == null) {
    return response.status(404).json(
      {
        message: `Product ${product_code} not found`
      });
  }
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
  checkout = checkoutRepository.searchById(checkoutId)
  if (checkout == null) {
    return response.status(404).json(
      {
        message: `Checkout ${checkoutId} not found`
      });
  }

  checkout.getProducts.push(product);
  checkoutRepository.persist(checkout);

  response.status(204).json();
}

function remove(request, response) {
  const checkoutId = request.params.x

  checkoutRepository = new CheckoutRepository();
  checkout = checkoutRepository.searchById(checkoutId)
  if (checkout == null) {
    return response.status(404).json(
      {
        message: `Checkout ${checkoutId} not found`
      });
  }

  checkoutRepository.delete(checkoutId);

  response.status(204).json();
}

module.exports = { create, addProduct, remove };