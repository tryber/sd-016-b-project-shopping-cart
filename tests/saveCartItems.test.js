const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  const parametro = localStorage.setItem;
  const argumento = '<ol><li>Item</li></ol>';

  test('Verifica se localStorage.getItem está sendo chamando', () => {
    saveCartItems(argumento);
    expect(parametro).toHaveBeenCalled();
  })

  test('Verifica se ao chamar saveCartItems retorna os orgumentos certos', () => {
    saveCartItems(argumento);
    expect(parametro).toHaveBeenCalledWith('cartItems', argumento);
  })
});
