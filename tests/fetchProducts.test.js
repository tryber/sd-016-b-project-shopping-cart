const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

window.fetch = jest.fn(fetchSimulator);

// test asincrono feito com base no post que encontrei no stackOverFlow link a baixo
// https://stackoverflow.com/questions/50816254/necessary-to-use-expect-assertions-if-youre-awaiting-any-async-function-calls
// https://www.leighhalliday.com/mock-fetch-jest  && https://jestjs.io/pt-BR/docs/asynchronous#callbacks 5º test usei esta sintax sem o asserions


describe('1 - Teste a função fecthProducts', () => {
  it('1.1 - Verificar se o fetchProducts.js é realmente uma Function:', () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  it('1.2 - Verificar se o fetchProducts.js é realmente uma Function with InstanceOf:',() => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });
  it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada:', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador":', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('4.1 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual a um objeto', () => {
    const objRetourn = fetchProducts('computador');
    expect(objRetourn).toBeInstanceOf(Object);
  });
  it('4.2 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect.assertions(1);
    const objReto = await fetchProducts('computador');
    expect(objReto).toEqual(computadorSearch);
  });
  it('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. ', async () => {
    await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url')); 
  });
});
