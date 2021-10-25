const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // Teste #1
  it('Check if execute getSavedCartItems the localStorage.getItem method is called', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });
  // Teste #2
  it('Check if execute getSavedCartItems the localStorage.getItem method is called with cartItems params', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
