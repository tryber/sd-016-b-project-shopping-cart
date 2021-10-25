const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('1.1 - Verificar se o getSavedCartItems.js é realmente uma Function:', () => {
    expect(typeof getSavedCartItems).toEqual('function');
  });
  it('1.2 - Verificar se o getSavedCartItems.js é realmente uma Function with InstanceOf:',() => {
    expect(getSavedCartItems).toBeInstanceOf(Function);
  });
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado:', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
