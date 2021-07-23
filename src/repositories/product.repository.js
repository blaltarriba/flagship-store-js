var Product = require('../models/product')

const PEN = new Product("PEN", "Lana Pen", 500);
const TSHIRT = new Product("TSHIRT", "Lana T-Shirt", 2000);
const MUG = new Product("MUG", "Lana Coffee Mug", 750);

class ProductRepository {
  constructor() {
      this.products = [PEN, TSHIRT, MUG];
  }

  searchById(id) {
    for (let position in this.products) {
      let product = this.products[position]
      if (id == product.code) {
        return product;
      }
    }
    return null;
  }
}

module.exports = ProductRepository;