const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Verifica se o método localStorage.setItem foi chamado ao chamar a função saveCartItems com o parâmetro "<ol><li>Item</li></ol>"', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Verifica se o método localStorage.setItem foi chamado com dois parâmetros ao chamar a função saveCartItems com o parâmetro "<ol><li>Item</li></ol>"', () => {
    const param1 = 'cartItems';
    const param2 = '<ol><li>Item</li></ol>'
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith(param1, param2);
  });
});
