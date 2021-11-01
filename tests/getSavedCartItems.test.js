describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  fail('Teste vazio');
  it('Deve invocar o método localStorage.getItem', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Deve invocar o método localStorage.getItem com o argumento \'cartItems\'', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});