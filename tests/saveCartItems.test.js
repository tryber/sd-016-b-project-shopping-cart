const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  test('Testa se saveCartItens é uma função', () => {
    expect(typeof(saveCartItems)).toBe('function');
  });
  
  test('Teste se função chama localStorage.setItem', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
