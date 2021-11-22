const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
});
