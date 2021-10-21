const fetchProducts = async (product) => {

  
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const data = await result.json()
  // console.log(data);


  return data;
};


if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// window.onload = fetchProducts('computador');
// window.onload = fetchProducts();
