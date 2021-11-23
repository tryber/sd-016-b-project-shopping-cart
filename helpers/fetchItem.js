const fetchItem = (search) => {
  if (!search) { return 'You must provide an url'; }
        const link = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
        return fetch(link)
        .then((response) => response.json()
        .then((data) => data.results));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
