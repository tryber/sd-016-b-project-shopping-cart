const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('teste se é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });

  it('testa se fetch foi chamada ao executar fetchProducts com o argumento computador', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('testa se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('testa se, ao chamar a função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const entry = await fetchProducts('computador');
    expect(entry).toEqual(computadorSearch);
  });

  it('testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(() => fetchProducts()).toThrow(new Error('You must provide an url'));
  });
  // fail('Teste vazio');
});
