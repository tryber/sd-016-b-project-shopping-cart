const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Test saveCartItems', () => {
  it('When saveCartItems is executed, the localStorage is called', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });
  it('Test arguments', () => {
    // saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cartItems',
      '<ol><li>Item</li></ol>'
    );
  });
});
