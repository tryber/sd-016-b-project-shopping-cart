const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it ('expects correct method', () => {
    const argTest = '<ol><li>Item</li></ol>';
    saveCartItems(argTest);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('expects correct method', () => {
    const argTest = '<ol><li>Item</li></ol>';
    saveCartItems(argTest);

    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', argTest);
  })
});
