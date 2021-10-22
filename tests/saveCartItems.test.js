const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  
it('1. Teste se, ao executar `saveCartItems` com o argumento `<ol><li>Item</li></ol>`, o método `localStorage.setItem` é chamado', () => {
  const saveList = `<ol><li>Item</li></ol>`
  const get = saveCartItems(saveList);
  expect(localStorage.setItem).toHaveBeenCalled();
});

it("'2. Teste se, ao executar `saveCartItems` com o argumento `<ol><li>Item</li></ol>`, o método `localStorage.setItem` é chamado com dois parâmetros, sendo o primeiro 'cartItems' e o segundo sendo o valor passado como argumento para `saveCartItems`", () => {
  expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', `<ol><li>Item</li></ol>`);
  });
});
