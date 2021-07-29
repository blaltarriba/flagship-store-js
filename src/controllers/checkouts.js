var CreateCheckoutService = require('../services/create_checkout')
var AddProductToCheckoutService = require('../services/add_product_to_checkout')
var DeleteCheckoutService = require('../services/delete_checkout')
var GetCheckoutAmountService = require('../services/get_checkout_amount')
var { ProductNotFoundError, CheckoutNotFoundError } = require('../exceptions/checkouts.exceptions')

function create(request, response) {
  const { product_code } = request.body

  let checkout = CreateCheckoutService.Do(product_code)
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

  try {
    AddProductToCheckoutService.Do(product, checkoutId);
    response.status(204).json();
  } catch (err) {
    if (err instanceof ProductNotFoundError) {
      return response.status(422).json(
        {
          message: `Product ${product} not found`
        });
    } else if (err instanceof CheckoutNotFoundError) {
      return response.status(404).json(
        {
          message: `Checkout ${checkoutId} not found`
        });
    } else {
      throw err;
    }
  }
}

function remove(request, response) {
  const checkoutId = request.params.x

  try {
    DeleteCheckoutService.Do(checkoutId);
    response.status(204).json();
  } catch (err) {
    if (err instanceof CheckoutNotFoundError) {
      return response.status(404).json(
        {
          message: `Checkout ${checkoutId} not found`
        });
    } else {
      throw err;
    }
  }
}

function getAmount(request, response) {
  const checkoutId = request.params.x

  let amount = GetCheckoutAmountService.Do(checkoutId);
  return response.status(200).json(
    {
      amount: amount
  });
}

module.exports = { create, addProduct, remove, getAmount };