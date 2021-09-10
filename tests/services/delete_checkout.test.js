const request = require('supertest-as-promised')
const app = require('../../src/app')
const Checkout = require('../../src/models/checkout')
const CheckoutRepository = require('../../src/repositories/checkout.repository')
const DeleteCheckout = require('../../src/services/delete_checkout')

describe('Delete checkouts', () => {
  it('should delete a checkout', async () => {
    let checkoutId = '1234'
    let mockCheckout = new Checkout(checkoutId, ['MUG'])
    let searchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout)
    let deleteSpy = jest.spyOn(CheckoutRepository.prototype, 'delete')

    DeleteCheckout.Do(checkoutId)

    expect(deleteSpy).toBeCalledTimes(1)
    searchByIdSpy.mockRestore()
    deleteSpy.mockRestore()
  })

  it('failed when checkout does not exist', async () => {
    let checkoutId = 'a_fake_checkout'

    expect(() => {DeleteCheckout.Do(checkoutId)}).toThrow("Checkout " + checkoutId + " not found")
  })
})