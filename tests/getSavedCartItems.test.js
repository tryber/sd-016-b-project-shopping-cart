const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  test('getSavedCartItems chama o método localStorage.getItem quando chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  test('getSavedCartItems chama o método localStorage.getItem("cartItems") quando chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });

  test('getSavedCartItems retorna undefined quando não há itens no localStorage', () => {
    const actual = getSavedCartItems();
    expect(actual).toBeUndefined();
  });
});
