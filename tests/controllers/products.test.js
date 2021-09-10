const request = require('supertest-as-promised')
const app = require('../../src/app')
const Product = require('../../src/models/product')
const ProductRepository = require('../../src/repositories/product.repository')

describe('Products endpoint', () => {
  describe('GET products', () => {
    it('should return all products', async () => {
      let productPen = new Product('PEN', 'Pencil', 500)
      let productMug = new Product('MUG', 'Mug', 750)
      let expectProducts = [productPen, productMug]

      let getAll = jest.spyOn(ProductRepository.prototype, 'getAll').mockReturnValueOnce(expectProducts)

      let response = await request(app).get('/products')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('products', expectProducts)
      getAll.mockRestore()
    })

    it('should return empty list when there is no product', async () => {
      let expectProducts = []

      let getAll = jest.spyOn(ProductRepository.prototype, 'getAll').mockReturnValueOnce(expectProducts)

      let response = await request(app).get('/products')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('products', expectProducts)
      getAll.mockRestore()
    })
  })

  describe('GET product by id', () => {
    it('should return product', async () => {
      let productPen = new Product('PEN', 'Pencil', 500)

      let searchById = jest.spyOn(ProductRepository.prototype, 'searchById').mockReturnValueOnce(productPen)

      let response = await request(app).get('/products/PEN')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('product', productPen)
      searchById.mockRestore()
    })

    it('failed when product does not exist', async () => {
      let productCode = 'FAKE'
      let expectBody = `Product ${productCode} not found`

      let response = await request(app).get(`/products/${productCode}`)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('message', expectBody)
    })
  })
})