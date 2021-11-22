const saveCartItems = require('../helpers/saveCartItems');
const html = '<ol><li>Item</li></ol>';

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('4.1 - o método localStorage.setItem é chamado', () => {
    saveCartItems(html);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('4.2 - o método localStorage.setItem é chamado com dois parâmetros', () => {
    saveCartItems(html);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', html);
  });
});
