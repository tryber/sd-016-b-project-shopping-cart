const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - A função getSavedCartItems', () => {
  // implemente seus testes aqui
  it("quando executada, chama o método 'localStorage.getItem'", () => {
    getSavedCartItems();
    expect.assertions(1);
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it("quando executada, o método 'localStorage.getItem' é chamado com cartItems como parâmetro", () => {
    getSavedCartItems();
    expect.assertions(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })

  //fail('Teste vazio');
});
