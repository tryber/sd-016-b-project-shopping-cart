const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Teste se fetch foi chamada executando a função fetchItem com o argumento "MLB1615760527"', async () => {
    const fetchCalled = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
});
