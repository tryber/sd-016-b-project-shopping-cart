const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifica se ao chamar fetchItem com o argumento MLB1615760527 a função fetch é chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se ao chamar fetchItem com o argumento MLB1615760527 a função fetch utiliza o endpoint correto', () => {
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('Verifica se retorna o objeto corretamente ao chamar com o argumento MLB1615760527', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })

  it('Verifica se ao chamar a função sem parâmetros retorna um erro', async () => {
    expect(() => fetchItem()).toThrow(new Error('You must provide an url'));
  })
});
