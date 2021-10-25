const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Test fecthProducts function', () => {
  it('if it is a function', () => {
    expect(typeof (fetchProducts)).toStrictEqual('function');
  });
  it('if fetch is called', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('if fetch is called with the right endpoint', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('if return the right object', async () => {
    const result = await fetchProducts('computador');
    expect(result).toStrictEqual(computadorSearch);
  });
  it('must return an error with no parameter', async () => {
    const expected = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toStrictEqual(expected);
  });
});
