const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  getSavedCartItems();

  it('Verifica se o método localStorage.getItem é chamado', () => {
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Verifica se o método localStorage.setItem é chamado com os parametros corretos', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
