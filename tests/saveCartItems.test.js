const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('ao chamar com o parametro <ol><li>Item</li></ol> deve conter no localStorage', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    const test = localStorage.setItem.mock.instances[0];
    const key = Object.keys(test);
    expect(key[0]).toEqual('setItem');
  });
  it('ao chamar com o parametro <ol><li>Item</li></ol> o setItem deve ser chamado com 2 parametros cartItems e <ol><li>Item</li></ol>', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    const test = localStorage.setItem.mock.calls[0]
    expect(test[0]).toEqual('cartItems');
    expect(JSON.parse(test[1])).toEqual(['<ol><li>Item</li></ol>']);// está entre [] pois na function savecartitems ela está salvando no local storage o parametro dentro de um array
  });
});
