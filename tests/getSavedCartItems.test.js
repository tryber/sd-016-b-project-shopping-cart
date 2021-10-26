const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('test getSaveCartItems with argument to call localStorage.setItem to be called', 
  () => {
    // saveCartItems('<ol><li>Item</li></ol>');
    expect(getSaveCartItems()).toHaveBeenCalled(localStorage.getItem);
  });
  it('test if getSaveCartItems its called with params',
  () => {
    // saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems');
  }) 
});
