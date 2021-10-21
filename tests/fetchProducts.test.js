const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('verificar se é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  it('verificar se ao passar o parametro computador fetch é chamado', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).not.toBeUndefined();// o retorno não é undefined então a função está retornarno a lista puxada do api
  });
  it('verificar se ao chamar a funcão com o parametro computador está sendo procurado por computador', async () => {
    expect.assertions(1)
    const result = await fetchProducts('computador');
    expect(result.query).toEqual('computador');
  });
  it('verificar se ao chamar com o parametro computador computador retorna o esperado', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('verificar se for chamada sem parametro retorna um erro com a mensagem You must provide an url', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
