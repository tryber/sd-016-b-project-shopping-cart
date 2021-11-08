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
  
  it('Testa se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', async () => {
  expect.assertions(1);
  const correctEndpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith(correctEndpoint);
  });
});