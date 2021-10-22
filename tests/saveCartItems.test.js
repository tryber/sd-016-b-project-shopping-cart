const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('Should call localStorage.setItem on call saveCartItems', () => {
    saveCartItems()
    expect(localStorage.setItem).toHaveBeenCalled()
  })
});
