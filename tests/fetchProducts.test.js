const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  test('Testa se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof(fetchProducts)).toBe('function');
  });

  test('Testa se fetchProducts com o argumento "computador" chama fetch', () => {
    expect.assertions(1);
    const search = fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('Testa se fetch foi chamada com endpoint correto', () => {
    expect.assertions(1);
    const search = fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test('Testa se retorno da função é um objeto igual a computadorSearch', async () => {
    const search = await fetchProducts('computador');
    expect(search).toEqual(computadorSearch);
  });

  test('Testa se retorna erro quando fetchProduts é chamada sem argumento', async () => {
    const erro = new Error('You must provide an url');
    const search = await fetchProducts();
    expect(search).toEqual(erro);
  });
});
