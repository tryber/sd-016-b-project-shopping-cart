const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('ao ser chamada com o argumento "computador", deve chamar fetch', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('ao ser chamada com o argumento "computador", fetch deve usar endpoint correto', () => {
    const expectedEndpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expectedEndpoint);
  });

  it('deve retornar um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });

  it('deve retornar um erro ao ser chamada sem argumentos', async () => {
    const expected = new Error('You must provide an url');
    const results = await fetchProducts();
    expect(results).toEqual(expected);
  });
});
