const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Se ao invocar a função o getItem é chamado', () => {
    getSavedCartItems();
    const test = localStorage.getItem.mock.instances[0];
    const test1 = Object.keys(test);
    expect(test1[0]).toEqual('getItem')
  });
  it('Se ao invocar a função parametro da getItem é cartItems', () => {
    getSavedCartItems();
    const test = localStorage.getItem.mock.calls[0];
    expect(test[0]).toEqual('cartItems')
  });
});
