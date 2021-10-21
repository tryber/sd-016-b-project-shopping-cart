const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('verifica se ao invocar a função o getItem é chamado', () => {
    getSavedCartItems();
    const test = localStorage.getItem.mock.instances[0];
    const key = Object.keys(test);
    expect(key[0]).toEqual('getItem')
  });
  it('verifica se ao invocar a função parametro da getItem é cartItems', () => {
    getSavedCartItems();
    const test = localStorage.getItem.mock.calls[0];
    expect(test[0]).toEqual('cartItems')
  });
});
