const Checkout = require('../../src/models/checkout')
const Product = require('../../src/models/product')
const CheckoutRepository = require('../../src/repositories/checkout.repository')
const GetCheckoutAmount = require('../../src/services/get_checkout_amount')
var { CheckoutNotFoundError } = require('../../src/exceptions/checkouts.exceptions')

describe('Get checkout amount', () => {
  it('should return checkout amount', async () => {
    let product1 = new Product('PEN', 'Pencil', 500)
    let product2 = new Product('MUG', 'Mug', 300)
    let checkoutId = '1234'

    let mockCheckout = new Checkout(checkoutId, [product1, product2])
    let searchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout)

    let amount = GetCheckoutAmount.Do(checkoutId)

    expect(amount).toBe(800)
    searchByIdSpy.mockRestore()
  })

  it('failed when checkout does not exist', async () => {
    let checkoutId = 'a_fake_checkout'

    expect(() => {GetCheckoutAmount.Do(checkoutId)}).toThrow(CheckoutNotFoundError)
  })
})