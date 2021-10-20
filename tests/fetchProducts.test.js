const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Testa se fetchProducts é uma função',async ()=>{
    result = await fetchProducts
    expect(result).toBeInstanceOf(Function);
  })

  it('checa se fetch foi chamada"',async ()=>{

    result = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })

  it('verifica se o endpoint esta correto',async ()=>{

    result = await fetchProducts('computador');
    expect(result.query).toEqual('computador')
  })

  it('testa o retorno e igual ao objeto computadorSearch',async ()=>{

    result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch)
  })

  it('verifica se retorna um erro ao nao passar argumentos',async ()=>{

    result = await fetchProducts();
    expect(result).toMatch('You must provide an url')
  })

});
