const Product = require('../../src/models/product')
const ProductRepository = require('../../src/repositories/product.repository')
const GetProducts = require('../../src/services/get_products')

describe('Get products', () => {
  it('should return all products', async () => {
    let product1 = new Product('PEN', 'Pencil', 500)
    let product2 = new Product('MUG', 'Mug', 750)

    let getAll = jest.spyOn(ProductRepository.prototype, 'getAll').mockReturnValueOnce([product1, product2])

    let products = GetProducts.Do()

    expect(products.length).toBe(2)
    expect(products[0].getCode).toBe('PEN')
    expect(products[1].getCode).toBe('MUG')
    getAll.mockRestore()
  })

  it('should return empty list when there is no product', async () => {
    let getAll = jest.spyOn(ProductRepository.prototype, 'getAll').mockReturnValueOnce([])

    let products = GetProducts.Do()

    expect(products.length).toBe(0)
    getAll.mockRestore()
  })
})