const Checkout = require('../../src/models/checkout')
const Product = require('../../src/models/product')
const CheckoutRepository = require('../../src/repositories/checkout.repository')
const ProductRepository = require('../../src/repositories/product.repository')
const GetCheckoutAmount = require('../../src/services/get_checkout_amount')

describe('Get checkout amount', () => {
  it('should return checkout amount', async () => {
    let product1 = new Product('PEN', 'Pencil', 500)
    let product2 = new Product('MUG', 'Mug', 750)
    let checkoutId = '1234'

    let mockCheckout = new Checkout(checkoutId, [product1, product2])
    let checkoutsSearchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout)
    let productSearch2x1PromotionById = jest.spyOn(ProductRepository.prototype, 'search2x1PromotionById').mockReturnValueOnce(null)
    let productSearchDiscountById = jest.spyOn(ProductRepository.prototype, 'searchDiscountById').mockReturnValueOnce(null)

    let amount = GetCheckoutAmount.Do(checkoutId)

    expect(amount).toBe(1250)
    checkoutsSearchByIdSpy.mockRestore()
    productSearch2x1PromotionById.mockRestore()
    productSearchDiscountById.mockRestore()
  })

  it('failed when checkout does not exist', async () => {
    let checkoutId = 'a_fake_checkout'

    expect(() => {GetCheckoutAmount.Do(checkoutId)}).toThrow("Checkout " + checkoutId + " not found")
  })

  it('Checkout amount with 2x1 promotion when checkout contains 2 of the same product with promotion', async () => {
    let productPen = new Product('PEN', 'Pencil', 500)
    let productMug = new Product('MUG', 'Mug', 750)
    let checkoutId = '1234'

    let mockCheckout = new Checkout(checkoutId, [productPen, productPen, productMug])
    let checkoutsSearchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout)
    let productSearch2x1PromotionById = jest.spyOn(ProductRepository.prototype, 'search2x1PromotionById').mockReturnValueOnce(productPen)
    let productSearchDiscountById = jest.spyOn(ProductRepository.prototype, 'searchDiscountById').mockReturnValueOnce(null)

    let amount = GetCheckoutAmount.Do(checkoutId)

    expect(amount).toBe(1250)
    checkoutsSearchByIdSpy.mockRestore()
    productSearch2x1PromotionById.mockRestore()
    productSearchDiscountById.mockRestore()
  })

  it('Checkout amount with 2x1 promotion when checkout contains 3 of the same product with promotion', async () => {
    let productPen = new Product('PEN', 'Pencil', 500)
    let checkoutId = '1234'

    let mockCheckout = new Checkout(checkoutId, [productPen, productPen, productPen])
    let checkoutsSearchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout)
    let productSearch2x1PromotionById = jest.spyOn(ProductRepository.prototype, 'search2x1PromotionById').mockReturnValueOnce(productPen)
    let productSearchDiscountById = jest.spyOn(ProductRepository.prototype, 'searchDiscountById').mockReturnValueOnce(null)

    let amount = GetCheckoutAmount.Do(checkoutId)

    expect(amount).toBe(1000)
    checkoutsSearchByIdSpy.mockRestore()
    productSearch2x1PromotionById.mockRestore()
    productSearchDiscountById.mockRestore()
  })

  it('Checkout amount with discount when checkout contains 3 of the same product with discount', async () => {
    let productMug = new Product('MUG', 'Mug', 750)
    let checkoutId = '1234'

    let mockCheckout = new Checkout(checkoutId, [productMug, productMug, productMug])
    let checkoutsSearchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout)
    let productSearch2x1PromotionById = jest.spyOn(ProductRepository.prototype, 'search2x1PromotionById').mockReturnValueOnce(null)
    let productSearchDiscountById = jest.spyOn(ProductRepository.prototype, 'searchDiscountById').mockReturnValueOnce(productMug)

    let amount = GetCheckoutAmount.Do(checkoutId)

    expect(amount).toBe(1686)
    checkoutsSearchByIdSpy.mockRestore()
    productSearch2x1PromotionById.mockRestore()
    productSearchDiscountById.mockRestore()
  })

  it('Checkout amount without discount when checkout contains less than 3 of the same product with discount', async () => {
    let productMug = new Product('MUG', 'Mug', 750)
    let checkoutId = '1234'

    let mockCheckout = new Checkout(checkoutId, [productMug, productMug])
    let checkoutsSearchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout)
    let productSearch2x1PromotionById = jest.spyOn(ProductRepository.prototype, 'search2x1PromotionById').mockReturnValueOnce(null)
    let productSearchDiscountById = jest.spyOn(ProductRepository.prototype, 'searchDiscountById').mockReturnValueOnce(productMug)

    let amount = GetCheckoutAmount.Do(checkoutId)

    expect(amount).toBe(1500)
    checkoutsSearchByIdSpy.mockRestore()
    productSearch2x1PromotionById.mockRestore()
    productSearchDiscountById.mockRestore()
  })

  it('Checkout amount without discount when checkout contains 3 of the same product without discount', async () => {
    let productMug = new Product('MUG', 'Mug', 750)
    let checkoutId = '1234'

    let mockCheckout = new Checkout(checkoutId, [productMug, productMug, productMug])
    let checkoutsSearchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout)
    let productSearch2x1PromotionById = jest.spyOn(ProductRepository.prototype, 'search2x1PromotionById').mockReturnValueOnce(null)
    let productSearchDiscountById = jest.spyOn(ProductRepository.prototype, 'searchDiscountById').mockReturnValueOnce(null)

    let amount = GetCheckoutAmount.Do(checkoutId)

    expect(amount).toBe(2250)
    checkoutsSearchByIdSpy.mockRestore()
    productSearch2x1PromotionById.mockRestore()
    productSearchDiscountById.mockRestore()
  })
})