const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  
  it('When execute "getSavedCartItems", "localStorage" is used', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });

  it('Expect "localStorage" is called with parameters', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });

});
