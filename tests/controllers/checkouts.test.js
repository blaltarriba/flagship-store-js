const request = require('supertest-as-promised');
const app = require('../../src/app');
const Checkout = require('../../src/models/checkout');
const Product = require('../../src/models/product');
const CheckoutRepository = require('../../src/repositories/checkout.repository');

describe('Checkouts endpoint', () => {
  describe('POST checkouts', () => {
    it('should create new checkout', async () => {
      let productCode = 'PEN'
      let body = { product_code: productCode }
      let expectProducts = [productCode]
      let uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      let response = await request(app).post('/checkouts').send(body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toMatch(uuidRegex);
      expect(response.body).toHaveProperty('products', expectProducts);
    });

    it('failed when product does not exist', async () => {
      let productCode = 'FAKE'
      let body = { product_code: productCode }
      let expectBody = `Product ${productCode} not found`;

      let response = await request(app).post('/checkouts').send(body);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', expectBody);
    });
  });

  describe('PATCH checkouts', () => {
    it('should add product to a checkout', async () => {
      let productCode = 'PEN'
      let body = { product: productCode }

      mockCheckout = new Checkout('1234', ['MUG']);
      let searchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout);
      let persistSpy = jest.spyOn(CheckoutRepository.prototype, 'persist');

      let response = await request(app).patch('/checkouts/1234').send(body);

      expect(response.status).toBe(204);
      expect(persistSpy).toBeCalledTimes(1);
      searchByIdSpy.mockRestore();
      persistSpy.mockRestore();
    });

    it('failed when product does not exist', async () => {
      let productCode = 'FAKE'
      let body = { product: productCode }

      let response = await request(app).patch('/checkouts/123').send(body);

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('message', `Product ${productCode} not found`);
    });

    it('failed when checkout does not exist', async () => {
      let checkoutId = 'a_fake_checkout'
      let body = { product: 'PEN' }

      let response = await request(app).patch(`/checkouts/${checkoutId}`).send(body);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', `Checkout ${checkoutId} not found`);
    });
  });

  describe('DELETE checkouts', () => {
    it('should delete a checkout', async () => {
      let mockCheckout = new Checkout('1234', ['MUG']);
      let searchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout);
      let deleteSpy = jest.spyOn(CheckoutRepository.prototype, 'delete');

      let response = await request(app).delete('/checkouts/1234');

      expect(response.status).toBe(204);
      expect(deleteSpy).toBeCalledTimes(1);
      searchByIdSpy.mockRestore();
      deleteSpy.mockRestore();
    });

    it('failed when checkout does not exist', async () => {
      let checkoutId = 'a_fake_checkout'

      let response = await request(app).delete(`/checkouts/${checkoutId}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', `Checkout ${checkoutId} not found`);
    });
  });

  describe('GET checkout amount', () => {
    it('return checkout amount', async () => {
      let product = new Product('MUG', 'Coffee Mug', 500)
      let mockCheckout = new Checkout('1234', [product]);
      let searchByIdSpy = jest.spyOn(CheckoutRepository.prototype, 'searchById').mockReturnValueOnce(mockCheckout);

      let response = await request(app).get('/checkouts/1234/amount');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('amount', "2.00€")
      searchByIdSpy.mockRestore();
    });
  });
});