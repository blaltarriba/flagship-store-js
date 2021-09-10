const Checkout = require('../../src/models/checkout')
const Product = require('../../src/models/product')
const CheckoutRepository = require('../../src/repositories/checkout.repository')
const AddProductToCheckout = require('../../src/services/add_product_to_checkout')

describe('Add product to a checkout', () => {
  it('should add product to a checkout', async () => {
    let productCode = 'PEN'
    let product = new Product(productCode, 'Pencil', 500)
    let checkoutId = '1234'

    let mockCheckout = new Checkout(checkoutId, [product])
    let searchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout)
    let persistSpy = jest.spyOn(CheckoutRepository.prototype, 'persist')

    AddProductToCheckout.Do(productCode,checkoutId)

    expect(persistSpy).toBeCalledTimes(1)
    searchByIdSpy.mockRestore()
    persistSpy.mockRestore()
  })

  it('failed when product does not exist', async () => {
    let checkoutId = '1234'
    let productCode = 'FAKE'

    expect(() => {AddProductToCheckout.Do(productCode,checkoutId)}).toThrow("Product " + productCode + " not found")
  })

  it('failed when checkout does not exist', async () => {
    let checkoutId = 'a_fake_checkout'
    let productCode = 'PEN'

    expect(() => {AddProductToCheckout.Do(productCode,checkoutId)}).toThrow("Checkout " + checkoutId + " not found")
  })
})