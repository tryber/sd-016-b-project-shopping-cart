const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    const test = localStorage.getItem.mock.instances[0];
    const key = Object.keys(test);
    expect(key[0]).toEqual('getItem')
  });
  it('Teste se, ao executar "getSavedCartItems", o método "localStorage.getItem" é chamado com o "cartItems" como parâmetro', () => {
    getSavedCartItems();
    const test = localStorage.getItem.mock.calls[0];
    expect(test[0]).toEqual('cartItems')
  })
});
