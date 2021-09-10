var CheckoutRepository = require('../repositories/checkout.repository')
var ProductRepository = require('../repositories/product.repository')
var { CheckoutNotFoundError } = require('../exceptions/checkouts.exceptions')

function Do(checkoutId) {
  let checkoutRepository = new CheckoutRepository()
  let checkout = checkoutRepository.searchById(checkoutId)
  if (checkout == null) {
    throw new CheckoutNotFoundError("")
  }

  let productRepository = new ProductRepository()
  let productRealUnits = calculateRealProductUnits(checkout)
  let productUnits = calculatePayableProductUnits(productRealUnits, productRepository)

  let amount = 0
  productUnits.forEach((quantity, productCode) => {
    let product = productRepository.searchById(productCode)
    let productWithDiscount = productRepository.searchDiscountById(productCode)
    if (productWithDiscount != null) {
      amount += calculateAmountWithDiscount(quantity, product.getPrice)
      return
    }

    amount += (product.getPrice * quantity)
  })

  return amount
}

function calculateRealProductUnits(checkout) {
  let productUnits = new Map()

  checkout.getProducts.forEach(currentProduct => {
    if (!productUnits.has(currentProduct.getCode)) {
      productUnits.set(currentProduct.getCode, 1)
      return
    }
    let currentProductCount = productUnits.get(currentProduct.getCode)
    productUnits.delete(currentProduct.getCode)
    productUnits.set(currentProduct.getCode, currentProductCount+1)
  })

  return productUnits
}

function calculatePayableProductUnits(productRealUnits, productRepository) {
  let productUnits = new Map()

  productRealUnits.forEach((quantity, productCode) => {
    let product = productRepository.search2x1PromotionById(productCode)
    if (product != null) {
      let payableQuantity = calculatePayableUnitsApplying2X1Promotion(quantity)
      productUnits.set(productCode, payableQuantity)
      return
    }
    productUnits.set(productCode, quantity)
  })

  return productUnits
}

function calculatePayableUnitsApplying2X1Promotion(quantity) {
	if (quantity%2 == 0) {
		return quantity / 2
	}
	return ((quantity - 1) / 2) + 1
}

function calculateAmountWithDiscount(quantity, price) {
	if (quantity < 3) {
		return price * quantity
	}
	let unitPriceWithDiscount = (price * 75) / 100
	return Math.trunc(unitPriceWithDiscount) * quantity
}

module.exports = { Do }