const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  test('verifica se o metodo localStorage é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  test('verifica de o metodo local storage é chamado com dolis parametros, cartItems e o valor', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect (localStorage.setItem).toHaveBeenCalledWith('cartItems','<ol><li>Item</li></ol>');
  })
});
