const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('1 - Para a função getSavedCartItems: implemente os testes no arquivo getSavedCartItems.test.js da pasta tests que está na raiz do projeto.', () => {

  });

  it('2 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {

  });

  it(`3 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o 'cartItems' como parâmetro.`, () => {

  });
});
