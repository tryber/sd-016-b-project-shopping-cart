const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Teste se fetch foi chamada executando a função fetchProducts com o argumento "computador"', async () => {
    const fetchCalled = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" ao chamar a função fetchProducts com o argumento "computador"', async () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    const fetchCalled = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    const fetchCalled = await fetchProducts('computador');
    expect(fetchCalled).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const expectedError = new Error('You must provide an url');
    const fetchCalled = await fetchProducts();
    expect(fetchCalled).toEqual(expectedError);
  });
});
