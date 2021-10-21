const fetchItem = async (id) => {
  if (id === undefined) {
    return new Error('You must provide an url'); 
  }
  const result = await fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((data) => data.json());
    return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
