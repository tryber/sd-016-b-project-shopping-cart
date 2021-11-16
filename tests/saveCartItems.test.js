const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  //Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;
  it('deve chamar o método localStorage.setItem quando chamado com um parâmetro', () => {
    const testItem = '<ol><li>Item</li></ol>';
    saveCartItems(testItem);
    expect(localStorage.setItem).toBeCalled();
  });
  //Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro 'cartItems' e o segundo sendo o valor passado como argumento para saveCartItems.
  it ('deve chamar o método localStorage.setItem com dois parâmetros quando chamado com um parâmetro', () => {
    const testItem = '<ol><li>Item</li></ol>';
    saveCartItems(testItem);
    expect(localStorage.setItem).toBeCalledWith('cartItems', testItem);
  });  
});
