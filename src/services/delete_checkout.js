var CheckoutRepository = require('../repositories/checkout.repository')
var { CheckoutNotFoundError } = require('../exceptions/checkouts.exceptions')

function Do(checkoutId) {
  checkoutRepository = new CheckoutRepository();
  checkout = checkoutRepository.searchById(checkoutId)
  if (checkout == null) {
    throw new CheckoutNotFoundError("");
  }

  checkoutRepository.delete(checkout);

  return checkout;
}

module.exports = { Do };