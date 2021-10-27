const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('getSavedTests', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')

  })
});
