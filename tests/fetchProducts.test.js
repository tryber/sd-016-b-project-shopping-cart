const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    const result = fetchProducts;
    expect(typeof (result)).toEqual('function');
  });
  it('Testa se fetch é chamado', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('Testa se fetch utiliza o endpoint adequado', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
});
