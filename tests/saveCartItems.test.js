const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - A função saveCartItems', () => {
  // implemente seus testes aqui
  it("com o argumento '<ol><li>Item</li></ol>' chama o método 'localStorage.setItem'", () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect.assertions(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  it("quando executada, o método 'localStorage.setItem' é chamado com cartItems e o argumento passado para a função como parâmetro", () => {
    saveCartItems('<ol><li>Item</li></ol>')
    expect.assertions(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cartItems", "<ol><li>Item</li></ol>");
  })

  //fail('Teste vazio');
});
