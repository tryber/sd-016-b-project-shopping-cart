const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('5 - Teste a função getSavedCartItems', () => {
  it('Ao executar getSavedCartItems, o método localStorage.setItem é chamado;', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toBeCalled();
  });
  it('Ao executar getSavedCartItems, o método localStorage.setItem é chamado com parâmetro;', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
