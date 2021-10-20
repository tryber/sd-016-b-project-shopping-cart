const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui  
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  it('Verificar se é uma function', () => {
    const isFunction = typeof fetchProducts;
    expect(isFunction).toBe('function');
  })
  it('Verifica se a função é chamada', async () => {
    expect.assertions(1);
    await fetchProducts(endPoint);
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () =>{
    expect.assertions(1);
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.' , async () => {
    expect.assertions(1);
    expect(await fetchProducts(endPoint)).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error(mensagem esperada aqui) para comparar com o objeto retornado da API.' , async () => {
    expect.assertions(1);
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
  // it('teste se o catch funciona', async () => {
  //   expect(await fetchProducts('https://api.mercadolibre.com/sites/MLB/search?q=')).toBe({});
  // });
});


// test("Test description", () => { const t = () => { throw new TypeError("UNKNOWN ERROR"); }; 
// expect(t).toThrow(TypeError); expect(t).toThrow("UNKNOWN ERROR"); }); 
