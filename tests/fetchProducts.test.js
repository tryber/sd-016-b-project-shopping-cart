const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

it('1 - Teste se `fetchProducts` é uma função', () => {
  expect(fetchProducts).toBeInstanceOf(Function);
});

it('2 - Execute a função `fetchProducts` com o argumento do item "MLB1615760527" e teste se `fetch` foi chamada', () => {
  fetchProducts('computador');
  expect(fetch).toBeCalled();
});

it('3 - Teste se, ao chamar a função `fetchProducts` com o argumento do item "MLB1615760527", a função `fetch` utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
  fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith(
    'https://api.mercadolibre.com/sites/MLB/search?q=computador'
  );
});

it('4 - Teste se o retorno da função `fetchProducts` com o argumento "computador" é uma estrutura de dados igual ao objeto `computadorSearch`, que já está importado no arquivo', async () => {
  const testFetch = await fetchProducts('computador');
  expect(testFetch).toEqual(computadorSearch);
});
});
