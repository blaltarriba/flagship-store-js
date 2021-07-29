const CreateCheckout = require('../../src/services/create_checkout')
const Product = require('../../src/models/product')

describe('Create checkouts', () => {
  it('should create new checkout', async () => {
    let productCode = 'PEN'
    let product = new Product(productCode, 'Lana Pen', 500)
    let expectProducts = [product]
    let uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    const responseCheckout = CreateCheckout.Do(productCode);

    expect(responseCheckout).toHaveProperty('id')
    expect(responseCheckout.id).toMatch(uuidRegex)
    expect(responseCheckout).toHaveProperty('products', expectProducts)
  })

  it('failed when product does not exist', async () => {
    let productCode = 'FAKE'
    const expectBody = `Product ${productCode} not found`

    const responseCheckout = CreateCheckout.Do(productCode)

    expect(responseCheckout).toBe(null)
  })
})