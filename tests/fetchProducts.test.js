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
  
  it('Teste a função fetchProducts utiliza o endpoint correto', async () => {
  expect.assertions(1);
  const correctEndpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith(correctEndpoint);
  });

  it('Teste a função fetchProducts com o argumento "computador"', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste a função fetchProducts tem a estrutura de dados adequada', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });

  it('Teste a função fetchProducts sem argumento, retorna o erro: You must provide an url', async () => {
      expect.assertions(1);
      try {
        await fetchProducts();
      } catch (error) {
        expect(error).toEqual(new Error('You must provide an url'));
      }
    });
});