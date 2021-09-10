var checkouts = new Map()

class CheckoutRepository {
  persist(checkout) {
    checkouts.set(checkout.id, checkout)
  }

  searchById(id) {
    return checkouts.get(id)
  }

  delete(checkout) {
    checkouts.delete(checkout.id)
  }
}

module.exports = CheckoutRepository
