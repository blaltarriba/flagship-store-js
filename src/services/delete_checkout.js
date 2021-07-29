var CheckoutRepository = require('../repositories/checkout.repository')
var { CheckoutNotFoundError } = require('../exceptions/checkouts.exceptions')

function Do(checkoutId) {
  let checkoutRepository = new CheckoutRepository()
  let checkout = checkoutRepository.searchById(checkoutId)
  if (checkout == null) {
    throw new CheckoutNotFoundError("")
  }

  checkoutRepository.delete(checkout)

  return checkout
}

module.exports = { Do }