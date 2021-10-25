const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('Verificar se fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
    // Utilizei diferente matcher do teste fetchProducts, para visualizar possibilidades.
  })
});
