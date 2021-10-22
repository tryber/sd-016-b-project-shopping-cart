const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('fecthProducts its a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('function "fetchProducts" heve been called', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Called function fetchProducts, use expect endpoint', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('compudator');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('function return to equal expect', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
});
