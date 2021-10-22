const removeCartItems = require('../helpers/removeCartItems');

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
});