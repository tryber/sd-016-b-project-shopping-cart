const fetchItem = (itemID) => {
  return fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((response) => response.json())
    .catch((error) => error);  
};

// window.onload = console.log(fetchItem('MLB1532308540'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}



// https://api.mercadolibre.com/items/MLB1341706310