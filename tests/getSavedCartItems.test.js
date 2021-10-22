const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(function () {
      this[arguments[0]] = arguments[1];
    }),
    getItem: jest.fn(function () {
      return this[arguments[0]];
    }),
    removeItem: jest.fn(function () {
      delete this[arguments[0]];
    }),
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

  test('getSavedCartItems retorna um array quando há itens no localStorage', () => {
    localStorage.setItem('cartItems', 'item1,item2');
    const actual = getSavedCartItems();
    expect(actual).toBeInstanceOf(Array);
    expect(actual).toHaveLength(2);
    expect(actual).toStrictEqual(['item1', 'item2']);
  });
});
