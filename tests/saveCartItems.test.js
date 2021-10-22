const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  saveCartItems('<ol><li>Item</li></ol>');

  it('Verifica se ao passar o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Verifica se ao passar o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado com os parametros corretos', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
