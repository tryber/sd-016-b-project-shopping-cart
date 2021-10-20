const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Verifica se retorna o objeto corretamente ao chamar com o argumento computador', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })
  it('Verifica se ao chamar a função sem parâmetros retorna um erro', async () => {
    expect(() => fetchProducts()).toThrow(new Error('You must provide an url'));
  })
});
