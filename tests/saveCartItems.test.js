const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('4 - Teste a função saveCartItems', () => {

  it('Teste a função saveCartItems', () => {
    expect.assertions(1);
    const argument = '<ol><li>Item</li></ol>';
    saveCartItems(argument);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});