const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('FetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });
  test('teste se fetch foi chamada quando o parametro computador foi chamado', async () => {
    const fetchTest = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })
  test('teste se fetch foi chamada quando o parametro computador foi chamado', async () => {
    const fetchTest = await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(url);
  })
});
