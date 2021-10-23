const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
