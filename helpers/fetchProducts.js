// realizado com auxílio do vídeo do professor Bernardo Salgueiro, explicando como fazer o requisito 1.
  const fetchProducts = async (product) => {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const itemAwait = await fetch(url)
      .then((response) => response.json())
      .catch(() => new Error('You must provide an url'));
    return itemAwait;
    };
  
  if (typeof module !== 'undefined') {
    module.exports = {
      fetchProducts,
    };
  }