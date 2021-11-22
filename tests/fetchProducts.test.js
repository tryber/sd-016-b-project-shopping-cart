const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se a função fetchProducts com o parâmetro `computador` chama a `fetch`', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se a função fetchProducts com o parâmetro `computador` usa o endpoint correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Verifica se a função fetchProducts com o parâmetro `computador` retorna o objeto correto', async () => {
    const result = await fetchProducts('computador');
    expect(result).toBe(computadorSearch);
  });
});