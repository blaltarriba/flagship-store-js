class Product {
  constructor(code, name, price) {
      this.code = code
      this.name = name
      this.price = price
  }

  get getCode() {
    return this.code
  }

  get getName() {
    return this.name
  }

  get getPrice() {
    return this.price
  }
}

module.exports = Product
