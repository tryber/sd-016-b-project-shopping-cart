const saveCartItems = require('../helpers/saveCartItems');

const testHTML = '<ol><li>Item</li></ol>';

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  test('Se localStorage.setItem é chamado:', () => {
    saveCartItems(testHTML);
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  test('Se é chamado com argumento correto:', () => {
    saveCartItems(testHTML);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', testHTML);
  })
});
