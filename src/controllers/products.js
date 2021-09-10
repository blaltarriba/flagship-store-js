var GetProductsService = require('../services/get_products')
var GetProductByIdService = require('../services/get_product_by_id')
var { ProductNotFoundError } = require('../exceptions/products.exceptions')

function getAll(request, response) {
  let products = GetProductsService.Do()
  return response.status(200).json(
    {
      products: products
    })
}

function getById(request, response) {
  let productId = request.params.x

  try {
    let product = GetProductByIdService.Do(productId)
    return response.status(200).json(
      {
        product: product
      })
  } catch (err) {
    if (err instanceof ProductNotFoundError) {
      return response.status(404).json(
        {
          message: err.message
        })
    } else {
      throw err
    }
  }
}

module.exports = { getAll, getById }