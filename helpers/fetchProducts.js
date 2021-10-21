// *************************************************************************************************************
// Comentando a função:
// **************************************************************************************************************
// 1- Acesso API Mercado Livre por meio de um End Point;
// 2- Fazendo uma requisição ao End Point por meio da função fetch, que retornará uma promisse BRUTA;
// 3- Pegando essa promisse BRUTA e extraindo dela o arquivo json e transformando ela num objeto json;
// 4- A função fetchProducts me retorna uma promisse de um arquivo json trabalhado e no formato de objeto json
// ************************************************************************************************************ */
const fetchProducts = (item) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
    .then((response) => response.json());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
