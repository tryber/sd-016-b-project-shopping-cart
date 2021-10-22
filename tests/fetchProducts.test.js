const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // teste 1
  it('Verifica se a função existe', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  // Os testes 2, 3 e 5 foram feitos seguindo o vídeo explicativo do professor Bernardo Salgueiro, postado nessa thread: https://trybecourse.slack.com/archives/C02B4PPBERE/p1634836814054200

  // teste 2 - VIDEO BERNARDO
  it('Verifica se ao chamar a função com o argumento "computador", fetch é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  // teste 3 - VIDEO BERNARDO
  it('Verifica se ao chamar a função com o argumento "computador", fetch é chamada com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  // teste 4 - 
  it('Verifica o retorno da função', async () => {
    const response = await fetchProducts('computador');

    expect.assertions(1);
    expect(response).toEqual(computadorSearch);
  })

  // // teste 5 - VIDEO BERNARDO
  it('Verifica o erro da função em caso de chamada sem argumento',  async () => {
    const expectedError = new Error('You must provide an url');
    const response = await fetchProducts();

    expect.assertions(1);
    expect(response).toEqual(expectedError);
  })
});
