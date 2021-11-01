const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    const actual = typeof fetchProducts;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });

  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    const result = await fetchProducts('computador');
    const actual = typeof result;
    const expected = 'object';
    expect(actual).toEqual(expected);
  });
});
