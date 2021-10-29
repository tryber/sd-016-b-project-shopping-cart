const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testar se fetchProducts é uma function', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it('Chamar fetchProducts com argumento "computador" e verificar se foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verificar se ao chamar a function "fetchProducts" com o argumento "computador", se a function fetch retorna o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    const checkEndPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(checkEndPoint);
  });

  it('Verificar se o retorno da function "fetchProducts" com argumento "computador" é uma estrutuda igual ao "computadorSearch"', async () => {
    expect(await  fetchProducts('computador')).toBe(computadorSearch);
  });

  it('Verificar se ao chamar a function "fetchProducts" sem parametros, retorna um erro com a mesagem: "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
