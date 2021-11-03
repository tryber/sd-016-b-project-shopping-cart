const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
    //test1
    it('O teste, ao executar getSavedCartItems, o método localStorage.getItem é chamado;', async () => {
      await getSavedCartItems();
      return expect(localStorage.getItem).toHaveBeenCalled()
    })
  
      //test2
      it('O teste, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro.', async () => {
        await getSavedCartItems('cartItems');
        return expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
      })
    
  // fail('Teste vazio');
});
