const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Test getSavedCartItems', () => {
  it('When getSavedCartItems, localStorage is executed', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });
  it('Expect localStorage to be called with parameters', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
