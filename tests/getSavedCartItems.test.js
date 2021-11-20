const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  //Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado;
  it('Testa se o metodo LocalStorage.getItem é chamado pela função', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });

  //Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o 'cartItems' como parâmetro.
  it('Testa se o metodo LocalStorage.getItem é chamado com o parametro "cartItems" pela função', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
