const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('deve chamar o método localStorage.setItem quando chamado com um parâmetro', () => {
    const param = '<ol><li>Item</li></ol>';
    saveCartItems(param);
    expect(localStorage.setItem).toBeCalled();
  });

  it ('deve chamar o método localStorage.setItem com dois parâmetros quando chamado com um parâmetro', () => {
    const param = '<ol><li>Item</li></ol>';
    saveCartItems(param);
    expect(localStorage.setItem).toBeCalledWith('cartItems', param);
  });
});
