const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    expect.assertions(1);
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    expect.assertions(1);
    saveCartItems('param');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'param');
  })
});
