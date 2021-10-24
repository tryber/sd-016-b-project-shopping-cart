const fetchItem = async (id) => {
  if (id === '') {
    throw new Error('You must to provide an url');
  }
  
  const url = `https://api.mercadolibre.com/items/${id}`;
  const item = await fetch(url)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));

  return item;  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
