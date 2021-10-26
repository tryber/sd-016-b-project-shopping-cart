/* Recuperando os elementos HTML */
const listCarts = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const loadingRequest = document.querySelector('.loading');

/* Ao clicar no botão esvazia o carrinho de compras */
const botaoEsvaziarCart = () => {
  const botao = document.querySelector('.empty-cart');

  botao.addEventListener('click', () => {
    listCarts.innerHTML = '';
    totalPrice.innerText = '';
    localStorage.clear();
  });
};

/* Criando a imagem do produto */
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

/* Retorna o ID do produto */
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

/* Salva e atualiza os produtos no Local Storage */
const saveLocalStorage = () => {
  const produto = listCarts.innerHTML;
  saveCartItems(JSON.stringify(produto));
};

/* Quando recarrega a página recupera o valor do produto no Local Storage */
const getValueProductLocalStorage = () => {
  totalPrice.innerHTML = localStorage.getItem('valueProduct');
};

/* Subtraindo os valores dos produtos */
const subProducts = (event) => {
  const textProduct = event.target.innerText;
  const arrProduct = textProduct.split(' ');
  const arrLengthPosition = arrProduct[arrProduct.length - 1];
  const valueProduct = arrLengthPosition.replace('$', '');
  let soma = Number(localStorage.getItem('valueProduct'));
  soma -= valueProduct;
  localStorage.setItem('valueProduct', soma);
  totalPrice.innerText = soma;
};

/* Removendo produto do carrinho de compras */
function cartItemClickListener(event) {
  event.target.remove();
  subProducts(event);
  saveLocalStorage();
}

/* Reenderiza o carrinho de compras com o dados no Local Storage */
const getLocalStorage = () => {
  const produtos = JSON.parse(getSavedCartItems());
  listCarts.innerHTML = produtos;

  const lis = document.querySelectorAll('.cart__item');
  lis.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

/* Somando os valores dos produtos */
const sumProducts = (price) => {
  let soma = Number(localStorage.getItem('valueProduct'));
  soma += price;
  localStorage.setItem('valueProduct', soma);
  totalPrice.innerText = soma;
};

/* Criando o produto a ser adicionado no carrinho de compras */
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  sumProducts(salePrice);
  return li;
}

/* Adiciona o produto no carrinho de compras */
const cartProdutoClick = async (event) => {
  const id = getSkuFromProductItem(event.target.parentNode);
  const elementProduto = await fetchItem(id);
  const carrinho = createCartItemElement(elementProduto);
  listCarts.appendChild(carrinho);
  saveLocalStorage();
};

/* Criando o produto */
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

/* Adicionando o produto na section da página principal */
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const butaozinho = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  butaozinho.addEventListener('click', cartProdutoClick);
  section.appendChild(butaozinho);

  return section;
}

/* Buscando produto na API e adicionando o produto na página */
const objProduto = async () => {
  loadingRequest.innerHTML = 'carregando';
  const elementProduto = await fetchProducts('computador');
  loadingRequest.remove();
  const sectionPai = document.querySelector('.items');
  elementProduto.results.forEach((item) => {
  const criandoProduto = createProductItemElement(item);
  sectionPai.appendChild(criandoProduto);
  });
};

window.onload = () => {
  objProduto();
  getLocalStorage();
  botaoEsvaziarCart();
  getValueProductLocalStorage();
};
