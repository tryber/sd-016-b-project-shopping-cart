const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {

  it(' verifica se getItem e chamada', ()=>{
    const result =  getSavedCartItems()
    expect(localStorage.getItem).toBeCalled();
  })

  it(' verifica se getItem e chamada com parametro', ()=>{
    const result =  getSavedCartItems('cartItems')
    expect(localStorage.getItem).toBeCalled();
  })
 
});
