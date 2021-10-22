const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  const param = '<ol><li>Item</li></ol>';
  // TESTE 1
  it('Ao executar a função, o método localStorage.setItem deve ser chamado', () => {
    saveCartItems(param);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  // TESTE 2
  it('Ao executar a função, verifica se o método localStorage.setItem foi chamado com os argumentos corretos', () => {
    saveCartItems(param);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', param);
  })

});
