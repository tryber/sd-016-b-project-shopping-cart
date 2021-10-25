const fetchItem = async (ID) => {
  if (typeof ID !== 'string') return new Error('You must provide an url');

  const result = await fetch(`https://api.mercadolibre.com/items/${ID}`)
  .then((response) => response.json())
  .then((data) => data);

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
