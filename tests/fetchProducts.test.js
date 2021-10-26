const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('must be a function', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('was fetch called', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('ao chama-la com argumento computador testa se fetch foi chamada com endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it('is fetchProducts return equal to computerSearch', async () => {
    const results = await fetchProducts('computador'); 
    expect(results).toEqual(computadorSearch);
  })
  it('must return an error', async () => {
    const result = await fetchProducts();
    const expectedError = new Error('You must provide an url');
    expect(result).toEqual(expectedError);
  })
});
