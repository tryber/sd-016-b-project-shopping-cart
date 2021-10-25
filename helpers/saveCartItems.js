// **********************************************************************************************************
// Proeficiencia:Comentando Linha a Linha
// ******************************************************************************************************
// Bem aqui temos uma const com o nome de saveCartItems
// que está recebendo uma arrow function onde é passado 
// por parâmetro um item que será setado no LocalStorage da pagina 
// hora desenvolvida. Como podemos visualizar dentro do corpo dessa função 
// temos um método chamado localSotorage.setItem que recebe como parâmetro 
// uma chave que foi definida no proje como sendo 'cartItems' que fará referencia
// ao item que for passado no memento que for invocado a assinatura dessa função no arquivo 
// script.js. Porque assinatura ? sim, assinatura pois no script.js tempo somente a assinaturas 
// de métodos, pois, pois a mágica só acontece no momento que for renderizado o index.html que é 
// onde será chamando todos esses arquivos.js e bem nesse momento essa renderização da página funciona 
// como se fosse a compilação do sistema isso quendo comparada uma aplicação desktop
// ******************************************************************************************************
const saveCartItems = (item) => {
  localStorage.setItem('cartItems', item);
};
// ********************
// COMENTANDO FUNÇÃO: 
// ********************
// Aqui foi utilizado uma estrutura condicional simples onde foi utilizado o método 
// typeof para verificar se o módule de exportação está diferente de undefine (vazio)
// se tiver algo será uma função ou funções que estarão compondo seu corpo(estrutura)
// neste caso deve ser todas exportadas para o arquivo que fizer seu required;  

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
