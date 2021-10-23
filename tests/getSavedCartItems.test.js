const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  beforeEach(() => {
    getSavedCartItems();
  });

  it('Testa se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Testa se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
