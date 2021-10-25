const fetchItem = async (id) => {
  // seu código aqui
  if (id !== undefined) {
    const result = await fetch(`https://api.mercadolibre.com/items/${id}`)
      .then((data) => data.json());
    return result;
  }

  throw new Error('You must provide an url');
};

// console.log(fetchItem('MLB1341706310'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
