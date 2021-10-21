const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

// A função saveCartItems que criei busca os elementos no HTML, que não pode ser acessado aqui nos testes. Acabei fazendo dessa forma pois da maneira que é pedido
//  passando html direto, nem o próprio teste aceita.

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  test('Se localStorage.setItem é chamado:', () => {
    const html = 'Alguma coisa';
    saveCartItems(html);
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  test('Se é chamado com argumento correto:', () => {
    const html = 'Algo';
    saveCartItems(html);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItem', html);
  })
});
