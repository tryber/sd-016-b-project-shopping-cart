const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  
  it('1. Teste se, ao executar `getSavedCartItems`, o método `localStorage.getItem` é chamado', () => {
    const get = getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  
  it('2. Teste se, ao executar `getSavedCartItems`, o método `localStorage.getItem` é chamado com o "cartItems" como parâmetro.', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
