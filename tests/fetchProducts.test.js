const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('Se é uma função', () => {
    expect(typeof(fetchProducts)).toBe('function');
  });

  test('Se a função fetch é chamada', async() => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  test('Se fetch em fetchProducts("computador") tem o endpoint correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  })

  test('Se o retorno se iguala a computadorSearch', async () => {
    const current = await fetchProducts('computador');
    expect(current).toEqual(computadorSearch);
  })

  test('Se a função sem argumento retorna um erro', async () => {
    await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  })  

});
