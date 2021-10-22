const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  beforeEach(() => {
    localStorage.clear;
  });

  const argument = '<ol><li>Item</li></ol>';

  it('Verifica se ao executar com o argumento "<ol><li>Item</li></ol>", localStorage.setItem é chamado.', () => {
    expect.assertions(1);
    saveCartItems(argument);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Verifica se ao executar com argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado com dois parâmetros, "cartItems" sendo o primeiro', () => {
    expect.assertions(1);
    saveCartItems(argument);

    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', argument);

  });
});
