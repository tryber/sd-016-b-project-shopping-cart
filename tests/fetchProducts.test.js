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
  it('Verifica se a função é chamada', () => {
    expect(fetchProducts(endPoint)).toBeTruthy();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async() =>{
    expect(fetchProducts(endPoint).then((data) => data.query === computadorSearch.query)).toBeTruthy();
  })
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.' , async () => {
    expect(await fetchProducts(endPoint)).toEqual(computadorSearch);
  });
  it('x' , async () => {
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
});


// test("Test description", () => { const t = () => { throw new TypeError("UNKNOWN ERROR"); }; 
// expect(t).toThrow(TypeError); expect(t).toThrow("UNKNOWN ERROR"); }); 
