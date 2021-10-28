const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('should called', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toBeCalled();
  });

  it('should called with the correct arguments', () => {
    getSavedCartItems('cartItems');

    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
