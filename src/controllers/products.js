var GetProductsService = require('../services/get_products')

function getAll(request, response) {
  let products = GetProductsService.Do()
  return response.status(200).json(
    {
      products: products
    })
}

module.exports = { getAll }