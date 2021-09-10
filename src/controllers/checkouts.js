var CreateCheckoutService = require('../services/create_checkout')
var AddProductToCheckoutService = require('../services/add_product_to_checkout')
var DeleteCheckoutService = require('../services/delete_checkout')
var GetCheckoutAmountService = require('../services/get_checkout_amount')
var { ProductNotFoundError, CheckoutNotFoundError } = require('../exceptions/checkouts.exceptions')
const NUMBER_OF_DECIMALES = 2
const EURO_SYMBOL = '€'

function create(request, response) {
  let { product_code } = request.body

  let checkout = CreateCheckoutService.Do(product_code)
  if (checkout == null) {
    return response.status(404).json(
      {
        message: `Product ${product_code} not found`
      })
  }
  response.status(200).json(checkout)
}

function addProduct(request, response) {
  let { product } = request.body
  let checkoutId = request.params.x

  try {
    AddProductToCheckoutService.Do(product, checkoutId)
    response.status(204).json()
  } catch (err) {
    if (err instanceof ProductNotFoundError) {
      return response.status(422).json(
        {
          message: err.message
        })
    } else if (err instanceof CheckoutNotFoundError) {
      return response.status(404).json(
        {
          message: err.message
        })
    } else {
      throw err
    }
  }
}

function remove(request, response) {
  let checkoutId = request.params.x

  try {
    DeleteCheckoutService.Do(checkoutId)
    response.status(204).json()
  } catch (err) {
    if (err instanceof CheckoutNotFoundError) {
      return response.status(404).json(
        {
          message: `Checkout ${checkoutId} not found`
        })
    } else {
      throw err
    }
  }
}

function getAmount(request, response) {
  let checkoutId = request.params.x

  try {
    let amount = GetCheckoutAmountService.Do(checkoutId)
    let formattedAmount = formatAmount(amount)
    return response.status(200).json(
      {
        amount: formattedAmount
      })
  } catch (err) {
    if (err instanceof CheckoutNotFoundError) {
      return response.status(404).json(
        {
          message: `Checkout ${checkoutId} not found`
        })
    } else {
      throw err
    }
  }
}

function formatAmount(amount) {
  let formattedAmount = amount/100
  return `${formattedAmount.toFixed(NUMBER_OF_DECIMALES)}${EURO_SYMBOL}`
}

module.exports = { create, addProduct, remove, getAmount }