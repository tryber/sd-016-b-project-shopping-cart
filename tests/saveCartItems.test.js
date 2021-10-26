const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Se o método `localStorage.setItem` é chamado ao executar saveCartItems com o argumento especificado.', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });
});
