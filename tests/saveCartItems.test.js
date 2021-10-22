const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');

    expect(localStorage.setItem).toHaveBeenCalled();
    // Credits: orlando dantas
  });

  it('Testa se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros', () => {
    const param1 = 'cartItems';
    const param2 = '<ol><li>Item</li></ol>';
    saveCartItems(param2);


    expect(localStorage.setItem).toHaveBeenLastCalledWith(param1, param2);

  });
});
