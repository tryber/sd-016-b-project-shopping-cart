const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Verifica se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Se chamada com o parâmetro MLB1615760527, verifica se a função foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Se chamada com o parâmetro MLB1615760527, verifica se a função foi chamada com o parâmetro', () => {
    const endpoint = `https://api.mercadolibre.com/items/MLB1615760527`;
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Se a chamada fetchItem("MLB1615760527") retorna a estrutura de dados correta', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('Se chamada sem parâmetros retorna um erro', async () => {
    const errorReturn = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(errorReturn);
  });
});
