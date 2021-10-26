const fetchItem = async (id) => {
  // seu código aqui
  // return fetch(`https://api.mercadolibre.com/items/${itemID}`)
  //   .then((data) => data.json())
  //   .catch((error) => error);

  if (id === undefined) {
    return new Error('You must provide an url');
  }

  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const result = await response.json();
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
