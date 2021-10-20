const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui

  test('1.fetchProducts é uma função?', () => {
    expect.assertions(1);
    expect(fetchProducts).toBeInstanceOf(Function)
  });
  

  test('2.fetchProducts com parametro \'computador\' chama fetch', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  
  test('4.fecthProducts com parametro \'computador\'', async () => {
    expect.assertions(1);
    await fetchProducts('computador').then((c) => expect(c).toEqual(computadorSearch));
  });
  
  test('5.fecthProducts sem parametro retorna um erro', () => expect(() => fetchProducts())
    .toThrowError(/You must provide an url/));
  
});
