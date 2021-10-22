const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifica se a função fetchItem com o parâmetro `MLB1615760527` chama a `fetch`', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se a função fetchItem com o parâmetro `MLB1615760527` usa o endpoint correto', 
  async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Verifica se a função fetchItem com o parâmetro `MLB1615760527` retorna o objeto correto', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it('Verifica se a função fetchItem sem argumento retorna uma mensagem de erro', async () => {
    expect.assertions(1);
    await expect(fetchItem()).rejects.toEqual(new Error('You must provide an url'));
  });
});
