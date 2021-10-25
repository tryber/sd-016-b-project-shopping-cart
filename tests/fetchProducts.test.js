const fetchSimulator = require('../mocks/fetchSimulator');
const {
  fetchProducts
} = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // Teste 1
  it('1 - Teste se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  // Teste 2
  it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada.', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  // Teste 3
  it('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador".', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  // Teste 4
  it('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect(await fetchProducts('computador')).toBe(computadorSearch);
  });
  // Teste 5
  it('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error ("mensagem esperada aqui") para comparar com o objeto retornado da API.', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });

});