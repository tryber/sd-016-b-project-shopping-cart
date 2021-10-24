const fetchItem = async (itemId) => {
  const API_URL = `https://api.mercadolibre.com/items/${itemId}`;

  try {
    const response = await fetch(API_URL);
    return response.json();
  } catch (error) {
    return error;
  }
};

// console.log(fetchItem('MLB1341706310'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
