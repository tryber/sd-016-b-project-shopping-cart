const fetchItem = async (id) => {
  // seu código aqui
  const response = await
    fetch(`https://api.mercadolibre.com/items/${id}`)
      .then((responseFetch) => responseFetch.json());
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
