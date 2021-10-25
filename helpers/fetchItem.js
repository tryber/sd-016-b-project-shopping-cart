async function fetchItem(idProduct) {
    const urlProduct = `https://api.mercadolibre.com/items/${idProduct}`;

    const productSpec = await fetch(urlProduct)
        .then((response) => response.json())
        .catch(() => new Error('You must provide an url'));
    return productSpec;
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
