const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(function () {
      this[arguments[0]] = arguments[1];
    }),
    removeItem: jest.fn(function () {
      delete this[arguments[0]];
    })
  },
});

describe('4 - Teste a função saveCartItems', () => {
  beforeEach(() => {
    localStorage.removeItem('cartItems');
  });
  test('saveCartItems chama o método localStorage.setItem quando chamado com o argumento "<ol><li>Item</li></ol>"', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('saveCartItems, quando chamado com o argumento "<ol><li>Item</li></ol>", chama o método localStorage.setItem("cartItems", "<ol><li>Item</li></ol>") ', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });

  test('saveCartItems não sobrescreve, apenas adiciona em "cartItems"', () => {
    saveCartItems('item1');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'item1');
    saveCartItems('item2');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'item1,item2');
  });
});
