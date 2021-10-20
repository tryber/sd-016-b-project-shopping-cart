const fetchItem = (productID) => {
  const URL = `https://api.mercadolibre.com/items/${productID}`;

  if (productID === undefined) {
    throw new Error('You must provide an url');
  }

  const teste = fetch(URL)
    .then((response) => response.json())
    .catch((error) => error.toString());
  return teste;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
