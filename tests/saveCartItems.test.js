const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('localStorage.setItem é chamdo com dois parâmetros', () => {
    saveCartItems('<ol><li>Item</li></ol');
    expect(localStorage.setItem).toBeCalledTimes(2);
  });
});
