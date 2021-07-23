class CheckoutRepository {
  constructor() {
      this.checkouts = new Map();
  }

  Persist(checkout) {
    this.checkouts.set(checkout.id, checkout);
  }
}

module.exports = CheckoutRepository;