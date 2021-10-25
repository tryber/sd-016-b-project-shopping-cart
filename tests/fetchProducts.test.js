const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Espera um arquivo JSON', () => {
    expect(fetchProducts).toBeInstanceOf(Object);
  });
  it('Expect toBeCalled Fetch', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('Testing EndPoint with argument Computador', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });
  it('Testing return of function FetchProducts, to be equal computadorSearch', async () => {
    const productsFetch = await fetchProducts('computador');
    expect(productsFetch).toEqual(computadorSearch);
  });
  it('Testing return of function FetchProducts without parameter, to be You must provide an url', async () => {
    const productsFetch = await fetchProducts();
    const error = new Error('You must provide an url');
    expect(productsFetch).toEqual(error);
  })
});
