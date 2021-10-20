const fetchItem = async () => {
  // seu código aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

  const result = await fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data.value));
  
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
