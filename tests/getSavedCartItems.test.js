const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Test getSavedCartItems function', () => {
  it('if localStorage is called', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('if localStorage is called with the right parameters', () => {
    const parameter = 'cartItems';
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith(parameter);
  })
});
