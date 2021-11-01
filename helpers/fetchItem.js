const fetchItem = async (idProduct) => {
  const urlProduct = `https://api.mercadolibre.com/items/${idProduct}`;
  const productSpecific = await fetch(urlProduct)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));
  return productSpecific;
};

// if (typeof module !== 'undefined')