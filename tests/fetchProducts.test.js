const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('ao chama-la com o argumento computador, testa se fetch foi chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chama-la com o argumento computador, teste se fetch foi chamado com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('se o retorno dessa função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('deve retornar um erro', async () => {
    const results = await fetchProducts();
    const expectedError = new Error ('You must provide an url');
    expect(results).toEqual(expectedError)
  })
});
