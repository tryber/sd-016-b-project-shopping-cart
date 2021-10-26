const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('Should call localStorage.getItem on call getSavedCartItems', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled()
  })

  it('Should getSavedCartItems be called with content expected', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  })
});
