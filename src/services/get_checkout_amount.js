var CheckoutRepository = require('../repositories/checkout.repository')
var { CheckoutNotFoundError } = require('../exceptions/checkouts.exceptions')

function Do(checkoutId) {
  let checkoutRepository = new CheckoutRepository()
  let checkout = checkoutRepository.searchById(checkoutId)
  if (checkout == null) {
    throw new CheckoutNotFoundError("")
  }

  let amount = 0
  checkout.getProducts.forEach(element => {
    amount += element.getPrice
  })

  return amount
}

module.exports = { Do }