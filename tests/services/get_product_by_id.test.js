const Product = require('../../src/models/product')
const ProductRepository = require('../../src/repositories/product.repository')
const GetProductById = require('../../src/services/get_product_by_id')

describe('Get product by id', () => {
  it('should return product', async () => {
    let productPen = new Product('PEN', 'Pencil', 500)
    let productById = jest.spyOn(ProductRepository.prototype, 'searchById').mockReturnValueOnce(productPen)

    let product = GetProductById.Do('PEN')

    expect(product).toBe(productPen)
    productById.mockRestore()
  })

  it('failed when product does not exist', async () => {
    let productId = 'a_fake_product'

    expect(() => {GetProductById.Do(productId)}).toThrow("Product " + productId + " not found")
  })
})