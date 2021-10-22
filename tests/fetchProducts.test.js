const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  const category = 'computador';
  test('se fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });

  test('se fetch foi chamada, quando a função fetchProducts("computador") é chamada', async () => {
    expect.assertions(1);
    await fetchProducts(category);
    expect(fetch).toHaveBeenCalled();
  });

  test('ao chamar a função fetchProducts("computador"), a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(1);
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${category}`;
    await fetchProducts(category);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('se a função fetchProducts("computador") é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const original = await fetchProducts(category);
    expect(original).toEqual(computadorSearch.results);
  });

  test('se chamar a função fetchProducts sem argumento, retorna um erro: You must provide an url', () => {
    expect.assertions(1);
    expect(() => fetchProducts()).toThrow(new Error('You must provide an url'));
  });

});
