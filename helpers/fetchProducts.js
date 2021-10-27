const fetchProducts = (category) => {
  if (!category) throw new Error('You must provide an url');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${category}`;

  // try {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   return data.results;
  // } catch (error) {
  //   throw new Error('You must provide an url');
  // }

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
