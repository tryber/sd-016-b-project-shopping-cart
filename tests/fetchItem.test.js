const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('1. Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });
  it('2. Executa a função fetchItem com o argumento do item "MLB1615760527" e testa se fetch foi chamada;', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
    // https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  });
  it('3. Testa se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('4. Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('5. Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const expectedError = new Error('You must provide an url');
    const product = await fetchItem();
     expect(product).toEqual(expectedError); 
  });

});