const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it(('Testa se getSavedCartItems é uma função'), () => {
    expect(typeof getSavedCartItems).toEqual('function');
  });

  it('Verifica se quando a função getSavedCartItems é executada, localStorage.setItem também é chamado', () => {
      getSavedCartItems();
      expect(localStorage.getItem).toBeCalled();
    });
  
  it('Verifica se a função getSavedCartItems é chamada com o parâmetro cartItemsn', () => {
      expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
    });
});
