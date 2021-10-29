// eslint-disable-next-line import/newline-after-import
const getSavedCartItems = require('../helpers/getSavedCartItems');
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('4.3 - o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('4.4 - o método localStorage.setItem é chamado com dois parâmetros', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});