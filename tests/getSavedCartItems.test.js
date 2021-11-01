const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('expects correct method to be cllaed', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('expects correct method to be called', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});