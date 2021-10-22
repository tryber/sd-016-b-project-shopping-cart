const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Verifica se ao chama getSavedCartItems o Metodo localStorage.getItem e chamado' , () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled()
  })
  it('Testa se o metodo localStorage.getItem e chamado com cartItems como argumento', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  })
});
