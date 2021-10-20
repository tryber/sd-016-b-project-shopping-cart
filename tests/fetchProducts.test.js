const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', async () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });
  it('Teste se fetch foi chamada executando a função fetchProducts com o argumento computador', async () => {
    const fetchCalled = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
});
