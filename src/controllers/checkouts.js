function create(request, response) {
  const { product_code } = request.body
  response.json(
    {
      status: 'Success',
      message: {
        id: '1234',
        products: [product_code],
      }
    });
}

module.exports = { create };