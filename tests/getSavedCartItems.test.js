const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  test('teste 1', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });
  test('teste 2', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('carItems');
  });
});
