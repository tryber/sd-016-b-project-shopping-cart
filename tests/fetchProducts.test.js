const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Verifies if fetchProducts is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifies the fetch', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifies the endpoint', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Verifies fetchProducts with the "computador" parameter', async () => {
    const fetchComputador = await fetchProducts('computador');
    expect(fetchComputador).toBe(computadorSearch);
  });

  it('Verifies if without a parameter, we get an error', async () => {
    const endpointError = new Error('You must provide an url');
    const fetchYetAgain = await fetchProducts();
     expect(fetchYetAgain).toEqual(endpointError); 
  });
});