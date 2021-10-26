const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {

  it('É chamada e executada quando chamada', async () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  
  it('quando executada, o método localStorage.getItem é chamado com o "cartItems"', async () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  }); 
});
