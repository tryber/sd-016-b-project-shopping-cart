// eslint-disable-next-line import/newline-after-import
const saveCartItems = require('../helpers/saveCartItems');
Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('4.1 - o método localStorage.setItem é chamado', () => {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('4.2 - o método localStorage.setItem é chamado com dois parâmetros', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
