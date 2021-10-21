const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  
  it('1. Testa se é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it('2. Testa se a função com argumento e se fetch foi chamada', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  });

  it('3. Testa se a função utiliza o endpoint:', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });

  it('4. Teste se a função com argumento "computador" retorna resultado igual a "computerSearch"', async () => {
    const analyse = await fetchProducts('computador');
    expect(analyse).toEqual(computadorSearch.results);
  });

  it('5. Teste se, ao chamar a função sem argumento, retorna um erro com a mensagem:', async () => {
    const error = 'You must provide an url';
    const analyse = await fetchProducts();
    expect(analyse).toEqual(error);
  })
});
// 4 - Teste se o retorno da função `fetchProducts` com o argumento "computador" é uma estrutura de dados igual ao objeto `computadorSearch`, que já está importado no arquivo.

// 5 - Teste se, ao chamar a função `fetchProducts` sem argumento, retorna um erro com a mensagem: `You must provide an url`. **Dica:** Lembre-se de usar o `new Error('mensagem esperada aqui')` para comparar com o objeto retornado da API.



// experct.assertions(1);

// fetchSimulator('https://api.mercadolibre.com/sites/MLB/search?q=computador', 'fetchProducts');

// const { fetchProducts } = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

// const products = await fetchProducts('computador')
// expect(fetchProducts('computador')).toStrictEqual(products);