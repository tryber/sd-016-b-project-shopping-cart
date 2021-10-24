const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  test('1 - localStorage.setItem é chamado com <ol><li>Item</li></ol>', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('2 - localStorage.setItem é chamado com dois parâmetros', () => {
    expect.assertions(1);

    // const param = ('cartItems', '<ol><li>Item</li></ol>');

    // saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });

});



