/* Capturando os elementos HTML */
const listCarts = document.querySelector('.cart_items');
const totalPrice = document.querySelector('.total-price');
// const loadingRequest = document.querySelector('.loading');

/* esvaziar Carrinho */
const esvaziaCarrinho = () => {
  listCarts.innerHTML = '';
  totalPrice.innerHTML = '';
  localStorage.clear();
};

/* Ação de esvaziar Carrinho */
const acaoEsvaziaCarrinho = () => {
  const botaoEsvaziar = document.querySelector('empty-cart');
  botaoEsvaziar.addEventListener('click', esvaziaCarrinho);
};

/* configura imagem do produto */
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

/* cria produto */
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

/* Adicionando o produto na pagina principal */
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const subtraiProdutos = () => {
  // const textProduto = event.target.innerText;
  // const vetorProduto = textProduto.split(' ');
  // const vetorPosition = vetorProduto[vetorProduto.length - 1];
};

/* removendo produto do carrinho de compras */
function cartItemClickListener(event) {
  event.target.remove();
  subtraiProdutos(event);
  saveLocalStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice.toFixed(2)}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = () => {
acaoEsvaziaCarrinho();
createProductItemElement();
getSkuFromProductItem();
createCartItemElement();
};
