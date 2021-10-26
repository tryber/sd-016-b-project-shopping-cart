const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
// const { expect } = require('chai');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('testando funcao fecthItem', () => {
    expect(typeof fetchItem).toBe('function');
  })
  fail('Teste vazio');
});
