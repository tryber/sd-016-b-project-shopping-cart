const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Se fetch foi chamada ao executar a função `fetchItem` com o argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
});
