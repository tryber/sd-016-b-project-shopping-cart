const mlApiUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = (item) => {
  if (!item) throw new Error('You must provide an url');
  
  const itemUrl = `${mlApiUrl}${item}`;

  return fetch(itemUrl)
    .then((response) => response.json())
    .then((infos) => infos.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
