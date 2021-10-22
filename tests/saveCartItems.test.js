const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('saveItemsTest', () => {
    beforeEach(() => {
      saveCartItems('<ol><li>Item</li></ol>')
    })
    expect(localStorage()).toHaveBeenCaledWith('<ol><li>Item</li></ol>' )
  });
});
