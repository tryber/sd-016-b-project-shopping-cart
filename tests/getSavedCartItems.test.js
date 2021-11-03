const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  test('verifica se o metodo localStorage é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  test('verifica de o metodo local storage é chamado com O cartItems como parametro', () => {
    getSavedCartItems();
    expect (localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
