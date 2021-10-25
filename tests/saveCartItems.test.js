const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Teste se ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    expect(saveCartItems('<ol><li>Item</li></ol>')).to
  });
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    expect(saveCartItems('<ol><li>Item</li></ol>')).to
  });
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    expect(getSavedCartItems()).to
  })
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro', () => {
    expect(getSavedCartItems()).to
  })
});
