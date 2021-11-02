const fetchItem = (item) => fetch(`https://api.mercadolibre.com/items/${item}`)
.then((data) => data.json())
.then((item) => item)
.catch((error) => error);


if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
