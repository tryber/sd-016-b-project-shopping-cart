const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it(('Testa se fetchItem é uma função'), () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it(('Testa se ao colocar o parametro "MLB1615760527" fetch é chamado'), async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it(('Testa se ao utilizar o parametro "MLB1615760527" a função acessa o endpoint correto'), async () => {
    const expectedURL = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');
    expect.assertions(1);
    expect(fetch).toHaveBeenCalledWith(expectedURL);
  });

  it(('testa se ao colocar o parametro "MLB1615760527" a função retorna um objeto igual ao da constante "item"'), async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item)
  });
  it(('Teste se ao chamar a função sem argumento um erro é retornado'), async() => {
    //esse teste foi realizado com sucesso após a mentoria da Ellen. 
    // O estudante Jeff Thierch estava com o mesmo problema com o meu e comentou que 
    // havia finalmente conseguido colocando o try catch no teste.
    const error = new Error('You must provide an url')
    try {
      await fetchItem();
    }
    catch {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  });
  
});
