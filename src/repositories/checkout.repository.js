var checkouts = new Map();

class CheckoutRepository {
  persist(checkout) {
    checkouts.set(checkout.id, checkout);
  }

  searchById(id) {
    return checkouts.get(id);
  }

  delete(id) {
    checkouts.delete(id);
  }
}

module.exports = CheckoutRepository;
