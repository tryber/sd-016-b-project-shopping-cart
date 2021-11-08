const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('1 - Teste a função fetchProducts', () => {

  it('Teste a função fetchProducts', () => {
    expect.assertions(1);
    expect(fetchProducts).toBeInstanceOf(Function);
  });
});