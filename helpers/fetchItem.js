function fetchItem(item) {
  return fetch(`https://api.mercadolibre.com/items/${item}`)
    .then((res) => res.json())
    .catch((error) => error);
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
