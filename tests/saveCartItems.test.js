const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se "localStorage.setItem" é chamado quando o argumento é "<ol><li>Item</li></ol>"', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    const test = localStorage.setItem.mock.instances[0];
    const key = Object.keys(test);
    expect (key[0]).toEqual('setItem');
  });
  it ('ao executar "saveCartItems" com o argumento "<ol><li>Item</li></ol>", o método "localStorage.setItem" é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para "saveCartItems"', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    const test = localStorage.setItem.mock.calls[0]
    expect(test[0]).toEqual('cartItems');
    expect(JSON.parse(test[1])).toEqual(['<ol><li>Item</li></ol>']);
  });
});
