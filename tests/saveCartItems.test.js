const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {

  it('Check saveCartItems call localStorage.setItem()', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Check saveCartItems call localStorage.setItem() with params', () => {
    const itemExample = '<ol><li>Item</li></ol>';
    saveCartItems(itemExample);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', itemExample);
  });
});
