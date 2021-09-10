var ProductRepository = require('../repositories/product.repository')

function Do() {
  let productRepository = new ProductRepository()
  let products = productRepository.getAll()
  return products
}

module.exports = { Do }