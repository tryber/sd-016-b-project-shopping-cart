const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // TESTE 1
  it('Verifica se a função existe', () => {
    expect(typeof fetchItem).toBe('function');
  });

  // TESTE 2
  it('Ao chamar a função com o argumento "MLB1615760527", verifica se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  // TESTE 3
  it('Ao chamar a função com o argumento "MLB1615760527", verifica se fetch utiliza o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  // TESTE 4
  it('Verifica o retorno da função', async () => {
    const response = await fetchItem('MLB1615760527');
    expect.assertions(1);
    expect(response).toEqual(item);
  });

  // TESTE 5
  it('Verifica o erro da função', async () => {
    const error = new Error('You must provide an url');
    const response = await fetchItem();

    expect.assertions(1);
    expect(response).toEqual(error);
  })
});
