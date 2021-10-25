// *************************************************************************************************************
// COMENTANDO A FUÇÃO LINHA A LINHA:
// **************************************************************************************************************
// 1- Acesso API Mercado Livre por meio de um End Point;
// 2- Fazendo uma requisição ao End Point por meio da função fetch, que retornará uma promisse BRUTA;
// 3- Pegando essa promisse BRUTA e extraindo dela o arquivo json e transformando ela num objeto json;
// 4- A função fetchProducts me retorna uma promisse de um arquivo json trabalhado e no formato de objeto json
// 5- Para implementar o caso de teste quando não for passado parâmetro coloquei uma estrutura condicional simples
//    que tem por finalidade analisar quando não tiver passado nada por parâmetro seja lançada um novo erro com o
//    o nome explicitado na string 'You must provide an url' o mesmo está sendo utilizado num teste para verificar
//    sua eficácia. 
// ************************************************************************************************************ */
const fetchProducts = (item) => {
  if (!item) {
    return new Error('You must provide an url');
  }
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
    .then((response) => response.json());
};
// ********************
// COMENTANDO FUNÇÃO: 
// ********************
// Aquifoi utilizado uma estrutura condicional simples onde foi utilizado o método 
// typeof para verificar se o módule de exportação está diferente de undefine (vazio)
// se tiver algo será uma função ou funções que estarão compondo seu corpo(estrutura)
// neste caso deve ser todas exportadas para o arquivo que fizer seu requirede;
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}