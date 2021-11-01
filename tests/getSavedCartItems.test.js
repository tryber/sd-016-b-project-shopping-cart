const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('when executing the function with the expected argument the method localStorage.getItem is called', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('when executing the function with the expected argument the method localStorage.getItem is called as parameter "cartItems"', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
