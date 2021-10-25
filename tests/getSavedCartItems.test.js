const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('O método `localStorage.getItem` é chamado', () => {
    const get = getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled(get);
  });
  
  it('Executando `getSavedCartItems`, `localStorage.getItem` é chamado com o "cartItems" como parâmetro.', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
