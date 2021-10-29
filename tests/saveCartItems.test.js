const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it(('Testa se saveCartItems é uma função'), () => {
    expect(typeof saveCartItems).toEqual('function');
  });

  it('Verificar quando a função getSavedCartItems é executada o localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });

  it('Verificar quando a função saveCartItems com o argumento <ol><li>Item</li></ol> o método localStorage.setItem é chamado', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
