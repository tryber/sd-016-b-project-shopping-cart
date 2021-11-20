const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // Teste se fetchProducts é uma função;
  it('testa se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  // Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;
  it('testa se fetchProducts foi chamada utilizando o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  //Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";
  it('testa se fetch utiliza endpoint correspondente ao argumento "computador" atribuído a fetchProducts', () => {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  //Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.
  it('testa o retorno da função fetchProducts utilizando o argumento "computador" é igual aos dados do objeto computadorSearch', async () => {
    const product = await fetchProducts('computador');
    expect(product).toEqual(computadorSearch);
  });

  //Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.
  it('testa se um erro com uma mensagem ao chamar a função sem argumento', async () => {
    const expError = new Error('You must provide an url');
    const value = await fetchProducts();
    expect(value).toEqual(expError);
  });
});

// Requisito 1 - Feito com auxilio do video disponibilizado no slack pelo Prof. Bernardo.
