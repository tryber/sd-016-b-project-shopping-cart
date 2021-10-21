const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  test('1.fetchProducts é uma função?', () => {
    expect.assertions(1);
    expect(fetchProducts).toBeInstanceOf(Function)
  });
  
  test('2.fetchProducts com parametro \'computador\' chama fetch', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  test('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"',
  async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  
  test('4.fecthProducts com parametro \'computador\'', async () => {
    expect.assertions(1);
    await fetchProducts('computador').then((c) => expect(c).toEqual(computadorSearch));
  });
  
  test('5.fecthProducts sem parametro retorna um erro', () => expect(() => fetchProducts())
    .toThrowError(/You must provide an url/));
  
});
