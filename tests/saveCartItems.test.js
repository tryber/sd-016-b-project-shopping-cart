const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste se a função saveCartItems', () => {
  // implemente seus testes aqui
  it('deve ser uma função', () => {
    expect(typeof saveCartItems).toBe('function');
  });
  it('ao ser chamada com "<ol><li>Item</li></ol>" possui localStorage.setItem', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('ao ser chamada com "<ol><li>Item</li></ol>" possui localStorage.setItem possuindo "cartItems" e o parâmetro passado para a função', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
