const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  //test1
  it('O teste é executado saveCartItemscom o argumento <ol><li>Item</li></ol>, o método localStorage.setItemé chamado;', async () => {
    await saveCartItems('<ol><li>Item</li></ol>' );
    return expect(localStorage.setItem).toHaveBeenCalled()
  })

    //test2
    it('Teste se, ao executar saveCartItemscom o argumento <ol><li>Item</li></ol>, o método localStorage.setItemé chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems.', async () => {
      await saveCartItems('<ol><li>Item</li></ol>' );
      return expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>')
    })
  
  // fail('Teste vazio');
});
