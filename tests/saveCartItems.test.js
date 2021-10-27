const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

const item = '<ol><li>Item</li></ol>';

describe('4 - Teste a função saveCartItems', () => {
  it('Ao executar saveCartItems, o método localStorage.setItem é chamado;', () => {
    saveCartItems(item)
    expect(localStorage.setItem).toBeCalled();
  });
  it('Ao executar saveCartItems, o método localStorage.setItem é chamado com dois parâmetros;', () => {
    saveCartItems(item)
    expect(localStorage.setItem).toBeCalledWith('cartItems', item);
  });
});
