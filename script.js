// Declarações Iniciais //
const itemsSection = document.querySelector('.items');
const cartItemsList = document.querySelector('.cart__items');
const clearCartBtn = document.querySelector('.empty-cart');

// Funções //
// Criar Thumbnail
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Criar Elementos
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Capturar o Sku (ID) do Produto
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Remover Item do Carrinho
function cartItemClickListener(event) {
  cartItemsList.removeChild(event.target);
}

// Adicionar ao Carrinho
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCartEvent(event) {
  const fetchResult = await fetchItem(getSkuFromProductItem(event.target.parentNode));

  const productObj = {
    sku: fetchResult.id,
    name: fetchResult.title,
    salePrice: fetchResult.price,
  };
  
  cartItemsList.appendChild(createCartItemElement(productObj));
  saveCartItems(cartItemsList.innerHTML);
}

// Esvaziar Carrinho
function eraseCartElements() {
  cartItemsList.innerHTML = ('');
  saveCartItems(cartItemsList.innerHTML);
}
clearCartBtn.addEventListener('click', eraseCartElements);

// Listagem de Produtos
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  const createSku = createCustomElement('span', 'item__sku', sku);
  const createName = createCustomElement('span', 'item__title', name);
  const createImg = createProductImageElement(image);
  const createBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  createBtn.addEventListener('click', addToCartEvent);

  section.appendChild(createSku);
  section.appendChild(createName);
  section.appendChild(createImg);
  section.appendChild(createBtn);
  return section;
}

async function fetchComputer() {
  const fetchResult = await fetchProducts('computador');

  fetchResult.results.forEach((item) => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    itemsSection.appendChild(createProductItemElement(itemObj));
  });
}

// Recuperar Carrinho do localStorage
function getCart() {
  cartItemsList.innerHTML = getSavedCartItems();
  cartItemsList.addEventListener('click', cartItemClickListener);
}

// Window Onload //
window.onload = () => {
  fetchComputer();
  getCart();
};
