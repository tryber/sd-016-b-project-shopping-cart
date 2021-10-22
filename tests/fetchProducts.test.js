const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Must be a function', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('Chamando fetchProducts com argumento computador testa se fetch foi chamado',
  () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('chamando com argumento computador, testa se fetch foi chamada com endpoint correto', 
  () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint); 
  });
  it('testa retorno fecthProduct é um objeto igual à computadorSearch', 
  async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  })
  it('deve retornar um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  })
});
