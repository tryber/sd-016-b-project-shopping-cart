
const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
window.fetch = jest.fn(fetchSimulator);

describe('1 - Test fecthProducts', () => {
  it('expect Json', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });
  it('Expect parameter "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('Test endpoint', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });
  it('Test if FetchProducts return === computadorSearch', async () => {
    const productsFetch = await fetchProducts('computador');
    expect(productsFetch).toEqual(computadorSearch);
  });
  it('Test return without parameter (You must provide an url)', async () => {
    const productsFetch = await fetchProducts();
    const error = new Error('You must provide an url');
    expect(productsFetch).toEqual(error);
    fail('Teste vazio');
  });
});