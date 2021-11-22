const fetchProducts = (prod) => {
if (!prod) {
  return new Error('You must provide an url');
}

const url = `https://api.mercadolibre.com/sites/MLB/search?q=${prod}`;

const result = fetch(url)
.then((response) => response.json())
.then((data) => data);
return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
