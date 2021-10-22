const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Verifica se chamada com o argumento <ol><li>Item</li></ol> o metodo localstorage.setItem é chamado', () => {
    const test = '<ol><li>Item</li></ol>';
    saveCartItems(test);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Verifica se chamada com o parâmetro <ol><li>Item</li></ol> o metodo localStorage.setItem é chamado da maneira correta', () => {
    const test = '<ol><li>Item</li></ol>';
    saveCartItems(test);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', test);
  });
});
