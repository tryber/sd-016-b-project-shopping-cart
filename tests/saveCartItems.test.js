const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  test('saveCartItems chama o método localStorage.setItem quando chamado com o argumento "<ol><li>Item</li></ol>"', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('saveCartItems, quando chamado com o argumento "<ol><li>Item</li></ol>", chama o método localStorage.setItem("cartItems", "<ol><li>Item</li></ol>") ', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
