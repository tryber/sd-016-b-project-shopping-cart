const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;

  const idProduct = await fetch(url)
  .then((response) => response.json())
  .catch((error) => console.log(error));
  return idProduct;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
