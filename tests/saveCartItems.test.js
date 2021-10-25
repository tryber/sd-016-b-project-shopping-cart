const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Verificar se a função saveCart é chamada', () => {
    saveCartItems('ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Verifica se ao executar saveCart o método localStorage é chamado com dois parâmetros', () => {
    const item = 'ol><li>Item</li></ol>'
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', item);
  });
});
