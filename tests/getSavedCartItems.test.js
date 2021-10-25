const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  const parametro = localStorage.getItem;
  test('Verifica se localStorage.getItem está sendo chamando', () => {
    getSavedCartItems();
    expect(parametro).toHaveBeenCalled();
  })

  test('Verifica se localStorage.getItem está chamando o parametro certo', () => {
    getSavedCartItems();
    expect(parametro).toHaveBeenCalledWith('cartItems');
  })
});
