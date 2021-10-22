// realizado com auxílio do vídeo do professor Bernardo Salgueiro, explicando como fazer o requisito 1.
const fetchProducts = async (product) => {
  try {
    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    return await data.json();
  } catch (error) {
    return error;
  }
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}