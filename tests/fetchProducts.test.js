const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Teste se a função é executada corretamente ao ser chamada com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se a função utiliza o endpoint correto ao ser chamada com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });

  it('Teste se o retorno da função ao ser chamada com o argumento "computador" é a estrutura de dados esperada', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('Teste se o retorno da função ao ser chamada sem argumento é uma mensagem de erro que lê-se "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
