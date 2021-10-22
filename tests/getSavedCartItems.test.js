const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalled();
    // Credits: orlando dantas
  });

  it('Testa se ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenLastCalledWith('cartItems');
    
  });
});
