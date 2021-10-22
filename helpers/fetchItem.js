const fetchItem = (id) => {
  const dataResult = fetch(`https://api.mercadolibre.com/items/${id}`)
 .then((data) => data.json())
 .catch(() => new Error('You must provide an url'));
 return dataResult;
};

if (typeof module !== 'undefined') {
module.exports = {
 fetchItem,
 };
}