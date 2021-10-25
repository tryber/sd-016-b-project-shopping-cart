const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  beforeEach(() => saveCartItems('<ol><li>Item</li></ol>'));
  
  it('O método LocalStorage é chamado?', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('O método LocalStorage é chamado com cartItems como parâmetro', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
});
