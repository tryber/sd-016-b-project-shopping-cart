/* 
- Criar uma listagem de produtos
- Consultar a API do mercado livre
- Procurar um produto específico ex:('computador')
*/
const fetchProducts = (product) => {
  const promise = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`) // fazendo a busca no end-point
    .then((response) => response.json())
    .then((data) => data) // pegando o retorno de uma Promise e tratando ela pra retornar no formato JSON (retorna uma Promise também)
    .catch((error) => error);
  return promise;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// fetchProducts('computador');
