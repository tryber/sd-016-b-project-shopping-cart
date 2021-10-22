function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// ***********************
// QUESTÃO 03 FRONT END *
// *****************************************************************************
// Remove o Elemento que possui eventos Click
// recebido por  li.addEventListener('click', cartItemClickListener) 
// Evento foi invocado em: createCartItemElement
// *****************************************************************************
function cartItemClickListener(event) {
       event.target.remove();
}
// *******************************************************************************
// FRONT END - Essa funçã cria e retorna um Elemento HTML 
// Etendimento: É a Segunda função mais abstrata a primeira
// esta logo acima createProductImageElement
// ******************************************************************************** */
// 1- Primerio temos a função createCustomElement que recebe 
//    03(três) parâmetro elemet -> que faz referencia ao elemento
//    HTML que vocẽ irá criar. O segundo parâmetro é o className->
//    que onde você deverá nomear o nome da classe que irá ser embutida
//    na tag desse elemento HTML passado por parâmetro de igual modo 
//    será deverá passar com parâmetro que irá compor o escopo desse 
//    elemento;
// 2- Foi criado uma constante e que irá recer o elemento que será 
//    criado pelo método createElement vale ressaltar que esse elemento
//    Pode ser qualquer elemento ao gosto do freguês
// 3- Criado esse elemento e capturado esse elemento por meio da const e
//    podemos embutir nesse elemento métodos inerentes ao javascript, para
//    nosso exemplo estamos trabalhando com dois métodos(atributos) que podemos atribuir
//    no escopo desse elemento: 1º - className e o 2º innerText
// 4- passo é retornar esse elemento e podemos dizer que temo uma forma 
//    Customizada para criar elementos dentro do DOM do nosso arquivo HTML
// ***************************************************************************************       
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// ***********************
// QUESTÃO 02 FRONT END//
// *********************
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice.toFixed(1)}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// *****************************************************
// COMETÁRIO DA FUNÇÃO: Não irei Utilizar essa função //
// ********************* ******************************
// 1- Recebe como parâmetro um item;
// 2- Retorna item pegando por meio do querySelector o texto 
//    que está na span propriedade item_sku.innerText;
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// **********************
// QUESTÃO 02 BACK END //
// ********************************************************************************************************
// 1- Criei uma função que irá fazer acesso a uma api utilizando a classe de conexão
//    fetchItem.js aqui temos uma primeira noção  de  orientação  objeto  quando 
//    importamos  fetchItem para dentro do arquivo index.html que é diferente do
//    que conheço que essa classe deveria ser instanciada dentro desse arquivo por meio
//    da instaciação de um objeto do tipo fetchItem, ou seja, 
//    FetchItem fetch = new  FetchItem() então faria acesso a essa classe e só 
//    então poderia pega o método de conexão no caso o fetch e fazer meus teste no 
//    próprio arquivo, porém, o paradigma aqui é um pouco mais abstrato, pois, no caso 
//    trabalhase com a ideia de que ele esta importado aqui ou existe essse objeto instanciado 
//    aqui e devemos trabalhar com o conceito de assinatura do método o que aumenta o grau de 
//    abstração para esse caso pois de fato a fução ou os objetos criados todos serão invocados
//    no arquivo index.html por meio de links referenciando arquivos scripst.js;
// 2- Em seguida pesando na ideia de assinatura e que irei fazer o teste dessa assinatura no 
//    no momento que executar o index.html utilizei uma estrutura de tratamento de erro também
//    utilizada no java chamada de try catch;
// 3- Em seguida fiz um acesso por meio da assintaura fetchItem a essa função passando como 
//    parametro o tipo de dados string com o id do Produto , pois, é o item que esperaremos o 
//    retorno, de um unico produto que o end Point irá disponibilizar para alimentar nossa
//    lista do carrinho de compra;
// 4- Utilizei duas partículas ou palavras reservdas para fazer menção que esse método é assíncrono,
//    pois, iremos fazer acesso a um servidor que nos servirá de dados hospedado, neste caso vamos 
//    trabalhar com ideia de promisse, logo, em JavaScript automaticamente introduz-se o conceito 
//    de assincronidade que de cara traz duas particulas importantes para serem trabalhadas na função
//    primeira async e a segunda que é o awiat;
// 5- Em seguida irei descontruir o objeto dataResult usando destructuring e puxando essa estrutura os
//    valores das variáveis id, name, price e adicionando as variaveis sku, name, salePrice;
// 6- Em seguida vou pegar a estrutura criada pelo Front-End createCartItemElement({sku,name,salePrice});
//    que recebe como parametro um objeto contendo três valores onde irei passar os valores desestruturados
//    e capturados do meu dataResult que irá alimentar essa estrutura no DOM do meu HTML;
// 7- Agora irei capturar o local onde será acoplado essa estrutura createCartItemElement por meio do método
//    querySelector referenciando a classe desse objeto;
// 8- Por fim irei pegar item que é o local onde irei acoplar essa estrutura e utilizar o método appendChild
//    passando elementChild como filho para essa este item.
// **********************************************************************************************************
async function addShoppingCartBackEnd(event) {
  const idProduto = event.target.parentNode.firstChild.innerText;
  try {
      const dataResult = await fetchItem(idProduto);
      const { id: sku, title: name, price: salePrice } = dataResult;
      const elementChild = createCartItemElement({ sku, name, salePrice });
      const itens = document.querySelector('.cart__items');
      itens.appendChild(elementChild);
   } catch (error) {
    console.log('Erro Function addShoppingCarBackEnd:', error);
  }
}

// **********************
// FRONT END //
// **********************
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAdicionar = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAdicionar.addEventListener('click', addShoppingCartBackEnd);
  section.appendChild(buttonAdicionar);

  return section;
}

// **********************
// QUESTÃO 01 BACK END //
// ***************************************************************************************************************************
// 1- Criei uma função que irá fazer acesso a uma api utilizando a classe de conexão
//    fetchProducts.js aqui temos uma primeira noção  de  orientação  objeto  quando 
//    importamos  fetchProducts para dentro do arquivo index.html que é diferente do
//    que conheço que essa classe deveria ser instanciada dentro desse arquivo por meio
//    da instaciação de um objeto do tipo fetchProducts, ou seja, 
//    FetchProducts fetch = new  FetchProducts() então faria acesso a essa classe e só 
//    então poderia pega o método de conexão no caso o fetch e fazer meus teste no 
//    próprio arquivo, porém, o paradigma aqui é um pouco mais abstrato, pois, no caso 
//    trabalhase com a ideia de que ele esta importado aqui ou existe essse objeto instanciado 
//    aqui e devemos trabalhar com o conceito de assinatura do método o que aumenta o grau de 
//    abstração para esse caso pois de fato a fução ou os objetos criados todos serão invocados
//    no arquivo index.html por meio de links referenciando arquivos scripts.js;
// 2- Em seguida pesando na ideia de assinatura e que irei fazer o teste dessa assinatura no 
//    no momento que executar o index.html utilizei uma estrutura de tratamento de erro também
//    utilizada no java chamada de try catch;
// 3- Em seguida fiz um acesso por meio da assintaura fetchProducts a essa função passando como 
//    parametro o tipo de dados string com o nome computador, pois, é o item que esperaremos o 
//    retorno, de todos os computadores que o end Point irá disponibilizar para alimentar nossa
//    pagina com dados vindo da API do mercado livre em nosso caso particular;
// 4- Utilizei duas partículas ou palavras reservdas para fazer menção que esse método é assíncrono,
//    pois, iremos fazer acesso a um servidor que nos servirá de dados hospedado, neste caso vamos 
//    trabalhar com ideia de promisse, logo, em JavaScript automaticamente introduz-se o conceito 
//    de assincronidade que de cara traz duas particulas importantes para serem trabalhadas na função
//    primeira async e a segunda que é o awiat;
// 5- await fetchProducts('computador') - nesse trecho temos a promessa de um arquivo json não mais 
//    com dados brutos mais dados polidos, ou seja, o json ja convertido em objeto javascript para 
//    ser manipulados que em nosso caso criamos uma constante chamda results que irá receber desse 
//    end Point um Objeto contendo várias chaves dentro onde a chave que nos interessa é a results
//    que é um Array de objetos, logo, temos um objeto contendo uma chave results que é um array de 
//    objetos. Bem para irmos passo a passo nesse cenário primeiro irei desestruturar esse objeto 
//    que recebi com retorno e vou de cara pegar a chave results dessa forma iremos direto ao ponto
//    melhor abordagem para isso é usa o destructuring para capturar essa chave results que esta 
//    contidade dentro desse objeto recebido pelo end point do mercado livre, o código irá ficar; 
//    da seguinte forma const { results } = await fetchProducts('computador'), criei uma variável com
//    o nome results só pra saber qual parte do objeto estamos desestruturando para trabalhar com 
//    com ela;
// 6- Beleza o resultado é um array de objetos, já que temos um array de objetos aqui nada melhor
//    que usar uma HOF forEach() para percorrer esses objetos pegando os valores das chaves que nos
//    interessa;                     
// 7- Bem peguei o array results e passei a hof forEach nele passando como parâmetro da hof o item
//    obrigatório e um parâmetro opcional que foi intitulado position . O que observamos aqui de 
//    importante é que iremos percorrer um array de objetos e ja'desestruturando cada um dos objetos
//    percorrido pelo arry retirando de cada objeto o valor da chave id,thumbnail,title e atribuindo esse valor a sku
//    name, image; 
// 8 - Sobre desistruturaçãoo vídeo maravilhoso:https://www.youtube.com/watch?v=f8a-qwKC5yk;
// 9 - em seguida uso a função createProductsElement({sku, name, image}); que ira receber das variáveis desestruturadas 
//     os valores capturados pelo forEch percorrido e seguida capturamos o lugar onde queremos setar esse valor na página 
//     HTML por meio do dom e por meio do método appendChild fazemos a inserção dos dados capturados exatamente no lugar 
//     capturado no dom. 
// ************************************************************************************************************************
async function backEndCreateProductItem() {
  try {
   const { results } = await fetchProducts('computador');
    results.forEach((item, position) => {
    const { id: sku, title: name, thumbnail: image } = results[position];
    const elementChild = createProductItemElement({ sku, name, image });
    const itens = document.querySelector('.items');
    itens.appendChild(elementChild);
  });
 } catch (error) {
   console.log('Seu erro é:', error);
 }
}
window.onload = () => {
  backEndCreateProductItem();
};