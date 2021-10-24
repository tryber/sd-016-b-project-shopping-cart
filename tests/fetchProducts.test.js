const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  it('Check fetchProducts is a function', () => {
    expect(fetchProducts).toBeInstanceOf(Function)
  });

  it('Check fetchProduct call fetch() function', async () => {
    expect.assertions(1);

    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Check fetchProduct call fetch() with params', async () => {
    expect.assertions(1);

    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Check fetchProducts return expected JSON', async () => {
    expect.assertions(1);

    const productsFetched = await fetchProducts('computador');
    expect(productsFetched).toEqual(computadorSearch);
  });

  it('Check fetchProducts return a error when called without parameters', async () => {
    expect(() => fetchProducts()).toThrow(new Error('You must provide an url'));
  });
});
