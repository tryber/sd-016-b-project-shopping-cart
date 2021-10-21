const getSavedCartItems = () => {
  // seu código aqui
  const storageArray = localStorage.getItem('cartItems');
  // const storageJson = JSON.parse(storageArray);

  return storageArray;
  // if (storageJson !== '[]') {
  //   return storageJson;
  // }
};

getSavedCartItems();

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
