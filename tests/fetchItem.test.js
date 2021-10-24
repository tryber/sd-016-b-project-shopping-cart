const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Testa se fetchItem é uma função.', () => {
    expect.assertions(1);

    expect(typeof(fetchItem)).toBe('function');
  });

  it('Ao executar fetchItem com o argumento "MLB1615760527", verifica se fetch foi chamada.' , async () => {
    expect.assertions(1);

    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Ao executar fetchItem com o argumento do id, a função utiliza o endpoint correto', async() => {
    expect.assertions(1);

    const URL_ITEMID = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(URL_ITEMID);
  });

  it('Verifica se o retorno da função "fetchItem" com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto "item" que já está importado.', async () => {
    expect.assertions(1);

    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Ao executar a função fetchItem sem argumento, retorna um erro com uma mensagem "You must provide an url".', () => {
    expect.assertions(1);

    expect(fetchItem()).rejects.toEqual(new Error('You must provide an url'));
  });
});
