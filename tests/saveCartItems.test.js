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
  it('Teste a função saveCartItems com localStorage.setItem', () => {
    expect.assertions(1);
    const argument = '<ol><li>Item</li></ol>';
    saveCartItems(argument);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Teste a função saveCartItems com localStorage.setItem e argumentos', () => {
    expect.assertions(1);
    const argument = '<ol><li>Item</li></ol>';
    saveCartItems(argument);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', argument);
  });
});