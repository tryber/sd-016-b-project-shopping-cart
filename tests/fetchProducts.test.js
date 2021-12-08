const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se a função fetchProducts com o parâmetro `computador` chama a `fetch`', async () => {
    expect.assertions(1); // Especificado número de testes realizados já que são assíncronos.
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled(); // Este matcher assegura que uma função mock foi chamda.
  });

  it('Verifica se a função fetchProducts com o parâmetro `computador` usa o endpoint correto', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Verifica se a função fetchProducts com o parâmetro `computador` retorna o objeto correto', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('Verifica se a função fetchProducts sem argumento retorna uma mensagem de erro', async () => {
    expect.assertions(1);
    await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
    // Matcher '.rejects' decodifica o motivo de uma promise ter falhado para que
    // algum outro matcher possa ser usado.
  });
});
