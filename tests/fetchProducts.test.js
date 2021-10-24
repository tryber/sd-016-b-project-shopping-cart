const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const URL_ML = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  expect.assertions(1);
  it('fecthProduts é uma função', () => {
    expect(typeof(fetchProducts)).toBe('function');
  });

  it('Ao executar fetchProducts com o argumento "computador", verifica se fetch foi chamada.', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Ao chamar fetchProducts, verifica se fetch utiliza a endpoint correta.', () => {
    expect.assertions(1);
    expect(fetch).toHaveBeenCalledWith(URL_ML);
  });

  it('Verifica se o retorno da função "fetchProducts" com o argumento "computador" é uma estrutura de dados igual ao objeto "computadorSearch".', async() => {
    expect.assertions(1);
    const defaultFetch = await fetchProducts('computador');

    expect(defaultFetch).toEqual(computadorSearch);
  });

  it('Verifica se retorna erro quando nenhum parâmetro for passado.', async () => {
    expect.assertions(1);

    await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  });
});
