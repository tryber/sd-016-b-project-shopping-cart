const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se FectchItem é do tipo função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Ao executar a função recebendo como argumento MLB1615760527 testa se a fetch é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se or agumento passado é equivalente ao enpoint que será recebido', () => {
    const endpoint = `https://api.mercadolibre.com/items/MLB1615760527`;
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Testa se quando recebido um argumento X possui uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const error = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(error);
  });
});
