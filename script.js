const cartList = document.querySelector('.cart__items');
const loading = document.querySelector('.loading');
// const totalPrice = document.querySelector('.total-price');

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//  return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) { // remove itens da lista
  const product = event.target;
  const productList = event.target.parentNode;
  productList.removeChild(product);
  saveCartItems(cartList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(event) { // adiciona itens na lista
  const itemId = event.target.parentNode.firstChild.innerText;
  const itemSelected = await fetchItem(itemId);
  const itemObject = {
    sku: itemSelected.id,
    name: itemSelected.title,
    salePrice: itemSelected.price,
  };
  const cartItem = createCartItemElement(itemObject);
  // totalPrice.innerText = (parseFloat(totalPrice.innerText) + parseFloat(itemObject.salePrice)).toFixed(2);
  cartList.appendChild(cartItem);
  saveCartItems(cartList.innerHTML);
}

async function searchProducts(product) {
  const returnedProducts = await fetchProducts(product);
  loading.innerHTML = 'carregando';
  const sectionItems = document.querySelector('.items');
  returnedProducts.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const researchedProducts = createProductItemElement(itemObject);
    researchedProducts.lastChild.addEventListener('click', addItemToCart);
    sectionItems.appendChild(researchedProducts);
  });
  loading.remove();
}

function restoreItems() {
  cartList.innerHTML = getSavedCartItems();
  const items = document.querySelectorAll('.cart__item');
  items.forEach((item) => item.addEventListener('click', cartItemClickListener));
}

function clear() {
  const emptyCart = document.querySelector('.empty-cart'); 
  
  emptyCart.addEventListener('click', () => {
    while (cartList.firstChild) {
      cartList.removeChild(cartList.firstChild);
    }
    // totalPrice.innerText = '0.00';
  });
}

window.onload = () => {
  searchProducts();
  restoreItems();
  clear();
};

// Requisito 1 - Feito com auxilio do video disponibilizado no slack pelo Prof. Bernardo.
// Requisito 5 - Utilizei os links abaixo para aprender a converter string para float(pois, a variavel contem ponto flutuante).
//  1. https://www.alura.com.br/artigos/convertendo-string-para-numero-em-javascript?gclid=CjwKCAiAs92MBhAXEiwAXTi257arD-LfW9GmL_rxFozke5S2mmGYUCnkN0vJ2n5NM4cmpaeH9XBLBhoCjScQAvD_BwE
//  2. https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
// Requisito 6 - Utilizei o tutorial abaixo para realizar o processo de limpar todos os elementos do carrinho
//  1. https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/