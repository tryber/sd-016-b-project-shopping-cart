const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('quando chamada, deve chamar o método localStorage.getItem', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });

  it('quando chamada, deve chamar o método localStorage.getItem com "cartItems" como parâmetro', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
