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

function cartItemClickListener(event) {
  event.target.remove();
}

/* Criando o produto a ser adicionado no carrinho de compras */
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

/* Adiciona o produto no carrinho de compras */
const cartProdutoClick = async (event) => {
  const id = getSkuFromProductItem(event.target.parentNode);
  const elementProduto = await fetchItem(id);
  const carrinho = createCartItemElement(elementProduto);
  const ol = document.querySelector('.cart__items');
  ol.appendChild(carrinho);
};

/* Criando o produto */
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

/* Adicionando o produto na section */
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
  const elementProduto = await fetchProducts('computador');
  const sectionPai = document.querySelector('.items');
  elementProduto.results.forEach((item) => {
  const criandoProduto = createProductItemElement(item);
  sectionPai.appendChild(criandoProduto);
  });
};

window.onload = () => {
  objProduto();
};
