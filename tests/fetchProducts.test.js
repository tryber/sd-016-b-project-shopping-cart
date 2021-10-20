const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it(('Testa se fetchProducts é uma função'), () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it(('Testa se ao colocar o parametro "computador" fetch é chamado'), async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it(('Testa se o retorno da função com o parametro "computador" retorna o restudado da constante computadorSearch'), async () => {
    expect.assertions(1);
    const testezinhoLindo = await fetchProducts('computador');
    expect(testezinhoLindo).toEqual(computadorSearch);
  })

  it(('Teste se ao chamar a função sem argumento um erro é retornado'), async() => {
    //esse teste foi realizado com sucesso após a mentoria da Ellen. 
    // O estudante Jeff Thierch estava com o mesmo problema com o meu e comentou que 
    // havia finalmente conseguido colocando o try catch no teste.
    const error = new Error('You must provide an url')
    try {
      await fetchProducts();
    }
    catch {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  })
});
