var CheckoutRepository = require('../repositories/checkout.repository')

function Do(checkoutId) {
  let checkoutRepository = new CheckoutRepository()
  let checkout = checkoutRepository.searchById(checkoutId)
  // if (checkout == null) {
  //   throw new CheckoutNotFoundError("")
  // }

  let amount = 0
  checkout.getProducts.forEach(element => {
    amount += element.getPrice
  })


  return amount
}

module.exports = { Do }