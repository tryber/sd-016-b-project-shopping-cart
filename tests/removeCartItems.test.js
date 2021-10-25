const removeCartItems = require('../helpers/removeCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(function () {
      this[arguments[0]] = arguments[1];
    }),
    removeItem: jest.fn(function () {
      delete this[arguments[0]];
    }),
    getItem: jest.fn(function () {
      return this[arguments[0]] || null;
    }),
  },
});

describe('BONUS :) - Teste a função removeCartItems', () => {
  beforeEach(() => {
    localStorage.setItem('cartItems', 'item1,item2,item3');
  });

  test('removeCartItems remove o item correto', () => {
    const expected = 'item1,item3';
    removeCartItems('item2');
    const actual = localStorage.cartItems;
    expect(actual).toEqual(expected);
  });

  test('removeCartItems remove a chave cartItems se esta ficar vazia após a remoção do item especificado', () => {
    removeCartItems('item1');
    removeCartItems('item2');
    removeCartItems('item3');
    expect(localStorage.getItem('cartItems')).toBeNull();
    expect(localStorage.cartItems).toBeUndefined();
  });
});