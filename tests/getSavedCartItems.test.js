const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  test('1 - localStorage.getItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  test('2 - localStorage.getItem recebe "cartItems" como parâmetro.', () => {
    expect.assertions(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
