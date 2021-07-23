class Checkout {
  constructor(id, products) {
      this.id = id;
      this.products = products;
  }

  get getId() {
    return this.id
  }

  get getProducts() {
    return this.products
  }
}

module.exports = Checkout;