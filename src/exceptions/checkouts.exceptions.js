class ProductNotFoundError extends Error {
  constructor(productId) {
    super("Product " + productId + " not found")
    this.name = "ProductNotFoundError"
  }
}

class CheckoutNotFoundError extends Error {
  constructor(checkoutId) {
    super("Checkout " + checkoutId + " not found")
    this.name = "CheckoutNotFoundError"
  }
}

module.exports = { ProductNotFoundError, CheckoutNotFoundError }