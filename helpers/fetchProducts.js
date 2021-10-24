const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = (query) => {
 const apiUrl = `${url}${query}`;
 const result = fetch(apiUrl)
 .then((response) => response.json())
 .then((data) => data)
 .catch(() => 'You You must provide an url');

return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
