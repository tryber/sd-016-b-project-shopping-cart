const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it(`4.1.1 - Teste se, ao executar saveCartItems com o argumento 
  <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;`, () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    const mockSetItem = localStorage.setItem.mock.instances[0];
    const key = Object.keys(mockSetItem);
    expect(key[0]).toEqual('setItem');
  });
  it(`4.1.2 - Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, 
  o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro  
  'cartItems' e o segundo sendo o valor passado como argumento para saveCartItems`, () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
