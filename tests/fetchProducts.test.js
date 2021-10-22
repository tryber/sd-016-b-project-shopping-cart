const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Verificar se fetchProduct é uma função fecthProducts', () => {
    const typeFunction = typeof fetchProducts;
    expect(typeFunction).toBe('function');
  });

  test('Testar se função fetchProducts chama fetch para computador como argumento ', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });

  test('Testar endpoint com argumento computador', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });

  test('Testar retorno fetchProducts = objeto computadorSearch', async () => {
    const products = await fetchProducts('computador');
    expect(products).toEqual(computadorSearch);
  });

  test('Testar função fetchProducts sem parâmetros retorna erro', async () => {
    const products = await fetchProducts();
    const error = new Error('You must provide an url');
    expect(products).toEqual(error);
  });
})
