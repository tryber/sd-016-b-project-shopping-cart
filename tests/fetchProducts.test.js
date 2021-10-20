const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Verificar se fetchProduct é uma função fecthProducts', () => {
    const typeFunction = typeof fetchProducts;
    expect(typeFunction).toBe('function');
  });

  test('Testar se função fetchProducts chama fetch para computador como argumento ', async () => {
    expect.assertions(1);
    await fecthProducts('computador');
    expect(fetch).toHaveBeenCaleed();
    // https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  });

  test('Testar endpoint com argumento computador', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });
});
