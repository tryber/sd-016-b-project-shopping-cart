const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {

  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {

    expect().toBe('')
  });
  fail('Teste vazio');
});

it('', () => {
  expect().toBe('')
});
fail('Teste vazio');
