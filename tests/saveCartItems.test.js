const { getVersion } = require('jest-cli');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('O método LocalStorage é chamado?', () => {
    const saveCartList = `<ol><li>Item</li></ol>`
    const get = getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled(get);
  });
  it('O método LocalStorage é chamado com cartItems como parâmetro', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems', `<ol><li>Item</li></ol>`);
  })
});
