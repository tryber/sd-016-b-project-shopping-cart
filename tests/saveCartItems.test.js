describe('3 - Teste a função saveCartItems', () => {
  it('Deve chamar o método localStorage.setItem', () => {
    const cartItems = '<ol><li>Item</li></ol>';

    saveCartItems(cartItems);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Deve chamar o método localStorage.setItem com o argumento correto', () => {
    const cartItems = '<ol><li>Item</li></ol>';

    saveCartItems(cartItems);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', cartItems);
  });
})