const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const { fetchItem } = require('../helpers/fetchItem');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('test it is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('test if it has been called', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('test endpoint used when called with param \'computador\'', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('test if type of the return is object.', async () => {
    const results = await fetchProducts('computador');
    expect(computadorSearch).toEqual(results);
  });
  it('test if when called without a param returns determined error message.', async ()=> {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  })
  // fail('Teste vazio');
});
