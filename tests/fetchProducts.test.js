const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Teste se a função fetchProducts é chamada com o argumento "computador"', () => {
    fetchProducts('computador');

    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se ao chamar a função fetchProducts com o argumento "computador" ela utiliza o endpoint correto', () => {
    fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Teste se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');

    expect(results).toEqual(computadorSearch);
  });

  it('Teste deve retornar um erro quando a função for chamada sem argumento', async () => {
    const expected = new Error('You must provide an url');
    const results = await fetchProducts();

    expect(results).toEqual(expected);
  });
});
