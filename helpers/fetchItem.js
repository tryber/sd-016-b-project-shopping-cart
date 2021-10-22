const fetchItem = async (itemID) => {
  // seu código aqui
  // return fetch(`https://api.mercadolibre.com/items/${itemID}`)
  //   .then((data) => data.json())
  //   .catch((error) => error);
  const response = await fetch(`https://api.mercadolibre.com/items/${itemID}`);
  const data = await response.json();
  return data.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
