const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  it('Check fetchProduct is defined', () => {
    expect(fetchProducts).toBeDefined();
  });

  it('Check fetchProducts is a function', () => {
    expect(fetchProducts).toBeInstanceOf(Function)
  });

  it('Check fetchProducts return expected JSON', async () => {
    const productsFetched = await fetchProducts('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    expect(productsFetched).toEqual(computadorSearch);
  });

  it('Check fetchProducts return a error when called without parameters', async () => {
    expect(() => fetchProducts().toThrowError('You must provide an url'));
  });
});
