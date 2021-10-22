const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {

  it('Verifica se ao executar, o método localStorage.getItem é chamado. ', () => {
    expect.assertions(1);
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Verifica se ao executar, o método localStorage.getItem pe chamado com o "cartItems" como parâmetro.', () => {
    expect.assertions(1);
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
