const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Testa se a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('deve ser uma função', () => {
    expect(typeof getSavedCartItems).toBe('function')
  });
  it('possui localStorage.getItem', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled()
  });
  it('possui "cartItems" passado como parâmetro para localStorage.getItem', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  });
});
