class CheckoutRepository {
  constructor() {
      this.checkouts = new Map();
  }

  persist(checkout) {
    this.checkouts.set(checkout.id, checkout);
  }

  searchById(id) {
    return null;
  }
}

module.exports = CheckoutRepository;