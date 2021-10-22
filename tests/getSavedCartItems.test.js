const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it(('Testa se getSavedCartItems é uma função'), () => {
    expect(typeof getSavedCartItems).toEqual('function');
  });
});
