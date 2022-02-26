const ol = document.querySelector('.cart__items');
const buttonEmpty = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// 3- Remove os items do carrinho, quando a li é clickada. remove também da memória local;
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(ol.innerHTML); // atualiza carrinho - 4;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// 2- Recebe os dados tratados de maneira assincrona de fecthItem. Dessa forma irá receber o ID de cada produto em específico, (comptadore, CPU, notebooks, memory cards). Através de um butão de escuta (click) essa função é chamada, e assim o event.target (evento ocorre específico) irá selecionar o objeto  que foi clickado e pegar o ID que está invisível, é guardado em uma constante a chamada da função assincrona fecthItem que recebe este id específico como parametro para que após tratada a promessa. A função createCartItemElement ao ser chamada recebe essa constante como parametro e através dessas informações retornadas de fecthItem, cria uma li dentro da Ol (appendchild), a cada vez que o botão específico do objeto é clickado. Cada li é uma string formado através d euma template literals; 
async function addItemCart(event) {
const textId = getSkuFromProductItem(event.target.parentNode);
const idItem = await fetchItem(textId);
const itemcar = createCartItemElement(idItem);
ol.appendChild(itemcar);
saveCartItems(ol.innerHTML);// atualiza o carrinho - 4;
}

// 7- Como para obter os objetos trata-se de uma função assincrona, a página deve exibir um texto carregando, até que os objetos apareçam. Seleciona a seção que contém o a string carregando, e reatribui o seu valor para string vazia. Essa função é chamada em createProductItemElement para garantir que só apagará p texto após os objetos serem criados.
function loadingPage() {
  const parentLoading = document.querySelector('.parentLoading');
  parentLoading.innerHTML = '';
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAddCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAddCart.addEventListener('click', addItemCart);
  section.appendChild(buttonAddCart);
  loadingPage();
  return section;
}

// 6- Botão que limpa o carrinho de compras (ol). Através de um evento de escuta click, a função anonima é executada, essa função reatribui o valor do HTML do carrinho que é uma ol com li de strings;
 function apagaCarrinho() {
     ol.innerHTML = '';
     saveCartItems(ol.innerHTML); // atualiza o carrinho - 4 
 }

 buttonEmpty.addEventListener('click', apagaCarrinho);
// 4- Chamada ao carregar a página, essa função tem como propósito salvar na memória local os itens que foram adcionados ao carrinho. Tentativa de retirar o undefined do carrinho, logo após a ol vazia receberia o valor correspondente em getSavedCartItems, e ao separar todas as li que recebem a classe cart__item, cada li irá receber um evento de click que ao ser ativado retira-a da memória local;
function saveItemValue() {
  if (localStorage.cartItems === undefined) {
    ol.innerHTML = '';
  }
  ol.innerHTML = getSavedCartItems();
  const liItem = document.querySelectorAll('.cart__item');
  liItem.forEach((l) => l.addEventListener('click', cartItemClickListener));
}

// 1- Esta função irá receber o que foi 'tratado' em fecthProducts de maneira assincrona, e irá preencher a seção 'items', com várias subseções menores, que contenham as respectivas propriedades do objecto criado através do forEach, acessado pelo data.results. Ao invocar a seção items (sectionProduct), que coloca como filhos dessa seção as seções criadas em createProductItemElement, que por sua vez recebem cada objeto feito em objProduct. Sua chamada aparece em window.onload para que seja executada assim que carregar a página, porém ela demora alguns segundos por se tratar de uma função assincrona que recebe a API;
async function searchProduct(product) {
  const resultSearch = await fetchProducts(product);
  const sectionProduct = document.querySelector('.items');
  resultSearch.results.forEach((item) => {
  const objProduct = {
    sku: item.id,
    name: item.title,
    image: item.thumbnail,
    };
    const completedProduct = createProductItemElement(objProduct);
    sectionProduct.appendChild(completedProduct);
  });
}

window.onload = () => { 
  searchProduct('computador');
  saveItemValue();
  // ol.innerHTML = '';
};
