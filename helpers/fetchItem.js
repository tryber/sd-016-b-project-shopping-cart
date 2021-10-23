// *************************************************************************************************************
// COMENTANDO A FUÇÃO LINHA A LINHA:
// **************************************************************************************************************
// 1- Acesso API Mercado Livre por meio de um End Point;
// 2- Fazendo uma requisição ao End Point por meio da função fetch, que retornará uma promisse BRUTA;
// 3- Pegando essa promisse BRUTA e extraindo dela o arquivo json e transformando ela num objeto json;
// 4- A função fetchProducts me retorna uma promisse de um arquivo json trabalhado e no formato de objeto json
//    prontinha para ser trahbalhada no javaScript
// ************************************************************************************************************ */
const fetchItem = (item) => {
  if (!item) {
    return new Error('You must provide an url');
  }
  return fetch(`https://api.mercadolibre.com/items/${item}`)
    .then((response) => response.json());
};

// const objetoMock = {
//   id: 'MLB1341706310',
//   title: 'Processador Amd Ryzen 5 2600 6 Núcleos 64 Gb',
//   subtitle: null,
//   price: 879,
// };
// const fetchItem = (item) => objetoMock;

// ********************
// COMENTANDO FUNÇÃO: 
// ********************
// Aquifoi utilizado uma estrutura condicional simples onde foi utilizado o método 
// typeof para verificar se o módule de exportação está diferente de undefine (vazio)
// se tiver algo será uma função ou funções que estarão compondo seu corpo(estrutura)
// neste caso deve ser todas exportadas para o arquivo que fizer seu requirede; 
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}