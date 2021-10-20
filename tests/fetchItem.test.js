const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('verificar se é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });
  it('verificar se chamar a funcao com o parametro MLB1615760527 fetch é invocado', async () => {//se o retorno não for undefined o fetch está sendo chamado
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).not.toBeUndefined();
  });
  it('verificar se chamar a funcao com o parametro MLB1615760527, o endpoint é referente ao id passado', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result.id).toEqual('MLB1615760527');
  });
  it('verificar se ao chamar com o parametro MLB1615760527 o retorno e igual ao item esperado', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('verificar se for chamada sem parametro retorna um erro com a mensagem You must provide an url', async () => {
    expect.assertions(1);
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
