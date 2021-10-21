const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Testa se fetchProducts é uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });
  //teste numero dois foi feito da mesma forma que o colega felipe sanches fez
  it('verificar se ao passar o parametro computador fetch é chamado', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).not.toBeUndefined();// o retorno não é undefined então a função está retornarno a lista puxada do api
  });
  it(' Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
  const response = await fetchProducts('computador');
    expect(response.query).toEqual('computador');
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);


    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('verificar se for chamada sem parametro retorna um erro com a mensagem "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
