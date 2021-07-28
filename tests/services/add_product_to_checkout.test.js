const Checkout = require('../../src/models/checkout');
const CheckoutRepository = require('../../src/repositories/checkout.repository');
const AddProductToCheckout = require('../../src/services/add_product_to_checkout');
var { ProductNotFoundError, CheckoutNotFoundError } = require('../../src/exceptions/checkouts.exceptions')

describe('Add product to a checkout', () => {
  it('should add product to a checkout', async () => {
    var productCode = 'PEN'
    var checkoutId = '1234'

    mockCheckout = new Checkout(checkoutId, ['MUG']);
    const searchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout);
    const persistSpy = jest.spyOn(CheckoutRepository.prototype, 'persist');

    AddProductToCheckout.Do(productCode,checkoutId);

    expect(persistSpy).toBeCalledTimes(1);
    searchByIdSpy.mockRestore();
    persistSpy.mockRestore();
  });

  it('failed when product does not exist', async () => {
    var checkoutId = '1234'
    var productCode = 'FAKE'

    expect(() => {AddProductToCheckout.Do(productCode,checkoutId)}).toThrow(ProductNotFoundError);
  });

  it('failed when checkout does not exist', async () => {
    var checkoutId = 'a_fake_checkout'
    var productCode = 'PEN'

    expect(() => {AddProductToCheckout.Do(productCode,checkoutId)}).toThrow(CheckoutNotFoundError);
  });
});