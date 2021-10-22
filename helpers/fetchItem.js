const fetchItem = async (id) => {

  if (id === undefined) {
    return new Error('You must provide an url');
  }

  const dados = await fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .then((data) => data);
  
    return dados;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
