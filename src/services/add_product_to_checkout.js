var ProductRepository = require('../repositories/product.repository')
var CheckoutRepository = require('../repositories/checkout.repository')
var { ProductNotFoundError, CheckoutNotFoundError } = require('../exceptions/checkouts.exceptions')

function Do(product, checkoutId) {
  let productRepository = new ProductRepository();
  if (productRepository.searchById(product) == null) {
    throw new ProductNotFoundError("");
  }

  let checkoutRepository = new CheckoutRepository();
  let checkout = checkoutRepository.searchById(checkoutId)
  if (checkout == null) {
    throw new CheckoutNotFoundError("");
  }

  checkout.getProducts.push(product);
  checkoutRepository.persist(checkout);

  return checkout;
}

module.exports = { Do };