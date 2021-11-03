const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('4.1 - Verifica se a função getSavedCartItems é chamada', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('4.2 - Verifica se ao executar a função getSavedCartItens é chamado com o cartItems como parâmetro.', ()=> {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
