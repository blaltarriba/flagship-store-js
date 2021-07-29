class ProductNotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = "ProductNotFoundError"
  }
}

class CheckoutNotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = "CheckoutNotFoundError"
  }
}

module.exports = { ProductNotFoundError, CheckoutNotFoundError }