const request = require('supertest-as-promised');
const app = require('../../src/app');
// const checkoutRepository = require('../../src/repositories/checkout.repository');
// const productRepository = require('../../src/repositories/product.repository');
// const Checkout = require('../../src/models/checkout');
// const CheckoutRepository = require('../../src/repositories/checkout.repository');

describe('Checkouts endpoint', () => {
  describe('POST checkouts', () => {
    it('should create new checkout', async () => {
      var productCode = 'PEN'
      var body = { product_code: productCode }
      var expectProducts = [productCode]
      var uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      const response = await request(app).post('/checkouts').send(body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toMatch(uuidRegex);
      expect(response.body).toHaveProperty('products', expectProducts);
    });

    it('failed when product does not exist', async () => {
      var productCode = 'FAKE'
      const body = { product_code: productCode }
      const expectBody = `Product ${productCode} not found`;

      const response = await request(app).post('/checkouts').send(body);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', expectBody);
    });
  });

  describe('PATCH checkouts', () => {
    // it('should add product to a checkout', async () => {
    //   var productCode = 'PEN'
    //   var body = { product: productCode }

    //   mockCheckout = new Checkout('1234', []);

    //   CheckoutRepository.searchById = jest.fn().mockReturnValueOnce(mockCheckout);

    //   const originalProductSearch = productRepository.searchById;
    //   productRepository.searchById = jest.fn(originalProductSearch);
    //   productRepository.searchById.mockImplementation(() => null);

    //   const response = await request(app).patch('/checkouts/123').send(body);

    //   expect(response.status).toBe(204);
    // });

    it('failed when product does not exist', async () => {
      var productCode = 'FAKE'
      var body = { product: productCode }

      const response = await request(app).patch('/checkouts/123').send(body);

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('message', `Product ${productCode} not found`);
    });

    it('failed when checkout does not exist', async () => {
      var checkoutId = 'a_fake_checkout'
      var body = { product: 'PEN' }

      const response = await request(app).patch(`/checkouts/${checkoutId}`).send(body);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', `Checkout ${checkoutId} not found`);
    });
  });
});