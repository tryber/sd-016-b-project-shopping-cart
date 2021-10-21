const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });
  //teste numero dois foi feito da mesma forma que o colega felipe sanches fez
  it('verificar se ao passar o parametro MLB1615760527 fetch é chamado', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).not.toBeUndefined();// o retorno não é undefined então a função está retornarno a lista puxada do api
  });
  it(' Teste se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
  const response = await fetchItem('MLB1615760527');
    expect(response.id).toEqual('MLB1615760527');
  });
  it('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect.assertions(1);


    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('verificar se for chamada sem parametro retorna um erro com a mensagem "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
