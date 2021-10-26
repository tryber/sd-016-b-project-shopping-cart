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

function createProductItemElement({ sku, name, image }) { // { sku, name, image } = product (da função fetchProduct)
  const section = document.createElement('section');
  section.className = 'item';
  // sku = id
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

/* Pega o container cart__itens, assim o LocalStorage consegue armazena e remover de acordo com oq tem no container
- Transforma os elemntos dentro do container em JSON, para não dar erro no cypress
- Chama a função de salvar no localStorage passando o elemento que está no container
*/
const containerCart = document.querySelector('.cart__items');

function takeLocalCartItems() {
  const string = JSON.stringify(containerCart.innerHTML);
  saveCartItems(string);
}

const p = document.querySelector('.total-price');

/* Subtrai os valores retirados do carrinho de compras */
function addTotalSubValue(event) {
  const value = event.target.innerText;
  const arr = value.split(' ');
  const priceProduct = arr[arr.length - 1];
  const number = priceProduct.replace('$', '');
  let sum = Number(localStorage.getItem('valueBuy'));
  sum -= number;
  localStorage.setItem('valueBuy', sum);
  p.innerText = sum;
}

function cartItemClickListener(event) {
  event.target.remove();
  addTotalSubValue(event);
  takeLocalCartItems();
}

/*
- Some o valor total dos itens do carrinho de compras:
- Pegar a chave salePrace(preço)
- Criar um somatório
- Apresentar o valor total da soma na página principal
- Usar a classe (total-price)
*/
function addTotalSumValue(price) {
  let sumLocal = Number(localStorage.getItem('valueBuy'));
  sumLocal += price;
  localStorage.setItem('valueBuy', sumLocal);
  p.innerText = sumLocal;
}

/* Recupera o valor da chave valueBuy do localStorage ao resetar a página  */
function getSumLocalStorage() {
  p.innerHTML = localStorage.getItem('valueBuy');
}

/*
- Transforma oq está no localStorage para string
- Recupera o pai cart__items onde vai ser add os elementos que estão gravadas no locaStorage
- Add no pai com o innerHtml
*/
function localStorageRender() {
  const string = JSON.parse(getSavedCartItems());
  containerCart.innerHTML = string;

  const products = document.querySelectorAll('.cart__item');
  products.forEach((product) => product.addEventListener('click', cartItemClickListener));
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  addTotalSumValue(salePrice);
  return li;
}

/* 
- Chame a função fetchProducts.js
- A partir dos dados da fetchProducts.js: 
  - crie os elementos HTML na função createProductItemElement(product)

  - Essa questão foi realizada com auxílio do vídeo que o Bê nos disponilizou
    - LINK: https://app.slack.com/client/TMDDFEPFU/CMT2P6CVC/files/F02JERCBK4M
*/

async function addProductsToCart(event) {
  const idProduct = event.target.parentElement.firstElementChild.innerText;
  const item = await fetchItem(idProduct);

  const itemObject = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  const items = createCartItemElement(itemObject);
  containerCart.appendChild(items);
  takeLocalCartItems(); // Ao adicionar o produto no carrinho, invoca a função de add no LocalStorage
  // console.log(localStorage.getItem('cartItems'));
}

function buttonAddToCartItems() {
  const buttonsAdd = document.querySelectorAll('.item__add');
  buttonsAdd.forEach((button) => {
    button.addEventListener('click', addProductsToCart);
  });
}

async function searchProducts(product) {
  const search = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  search.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const searchItem = createProductItemElement(itemObject);
    sectionItem.appendChild(searchItem);
  });
  buttonAddToCartItems();
}
/*
- Chama o botão, esvaziar carrinho
- Add evento quando se clica no botão
- No container do carrinho o HTML fica vazio com as aspas sem nada dentro
- Salva oq realizou com a chamada da função takeLocalCartItems() que serve para salvar no LocalStorage
*/
function emptyButton() {
  const btnEmpty = document.querySelector('.empty-cart');
  btnEmpty.addEventListener('click', () => {
    containerCart.innerHTML = '';
    takeLocalCartItems();
    localStorage.clear();
    p.innerText = '';
  });
}

/* 
- Criar o texto de carregamento durante a requisição de uma API
*/

// function loading() {

// }

window.onload = () => {
  searchProducts('computador');
  localStorageRender();
  emptyButton();
  getSumLocalStorage();
};
