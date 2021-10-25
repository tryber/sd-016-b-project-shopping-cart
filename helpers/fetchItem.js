const fetchItem = async (id) => {
  if (undefined) {
    throw new Error('You must provide an url');
  }
  const items = await fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json());
      
    // console.log(items);
    return items;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
