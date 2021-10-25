const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchProducts é uma função.', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Teste se a função é executada corretamente ao ser chamada com o argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se a função utiliza o endpoint correto ao ser chamada com o argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Teste se o retorno da função ao ser chamada com o argumento "MLB1615760527" é a estrutura de dados esperada', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Teste se o retorno da função ao ser chamada sem argumento é uma mensagem de erro que lê-se "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
