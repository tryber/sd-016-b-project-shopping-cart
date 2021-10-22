const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalled();
    // Credits: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  });

  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenLastCalledWith('cartItems');
    // Credits: https://jestjs.io/pt-BR/docs/expect#tohavebeenlastcalledwitharg1-arg2-
  });
});
