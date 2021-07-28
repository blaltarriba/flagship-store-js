const request = require('supertest-as-promised');
const app = require('../../src/app');
const Checkout = require('../../src/models/checkout');
const CheckoutRepository = require('../../src/repositories/checkout.repository');
const DeleteCheckout = require('../../src/services/delete_checkout');
var { ProductNotFoundError, CheckoutNotFoundError } = require('../../src/exceptions/checkouts.exceptions')

describe('Delete checkouts', () => {
  it('should delete a checkout', async () => {
    checkoutId = '1234'
    mockCheckout = new Checkout(checkoutId, ['MUG']);
    const searchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout);
    const deleteSpy = jest.spyOn(CheckoutRepository.prototype, 'delete');

    DeleteCheckout.Do(checkoutId);

    expect(deleteSpy).toBeCalledTimes(1);
    searchByIdSpy.mockRestore();
    deleteSpy.mockRestore();
  });

  it('failed when checkout does not exist', async () => {
    var checkoutId = 'a_fake_checkout'

    expect(() => {DeleteCheckout.Do(checkoutId)}).toThrow(CheckoutNotFoundError);
    ;
  });
});