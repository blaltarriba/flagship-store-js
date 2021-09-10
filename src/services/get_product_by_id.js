var ProductRepository = require('../repositories/product.repository')
var { ProductNotFoundError } = require('../exceptions/products.exceptions')

function Do(productId) {
  let productRepository = new ProductRepository()
  let product = productRepository.searchById(productRepository)
  if (product == null) {
    throw new ProductNotFoundError(productId)
  }

  return product
}

module.exports = { Do }