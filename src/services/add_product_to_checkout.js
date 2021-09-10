var ProductRepository = require('../repositories/product.repository')
var CheckoutRepository = require('../repositories/checkout.repository')
var { ProductNotFoundError, CheckoutNotFoundError } = require('../exceptions/checkouts.exceptions')

function Do(productCode, checkoutId) {
  let productRepository = new ProductRepository()
  let product = productRepository.searchById(productCode)
  if (product == null) {
    throw new ProductNotFoundError("Product " + productCode + " not found")
  }

  let checkoutRepository = new CheckoutRepository()
  let checkout = checkoutRepository.searchById(checkoutId)
  if (checkout == null) {
    throw new CheckoutNotFoundError("Checkout " + checkoutId + " not found")
  }

  checkout.getProducts.push(product)
  checkoutRepository.persist(checkout)

  return checkout
}

module.exports = { Do }