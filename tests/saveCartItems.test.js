const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Test saveCartItems function', () => {
  it('if localStorage is called', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('if localStorage is called with the right parameters', () => {
    const parameter = '<ol><li>Item</li></ol>';
    saveCartItems(parameter);
    expect(localStorage.setItem ).toHaveBeenCalledWith('cartItems', parameter);
  })
});
