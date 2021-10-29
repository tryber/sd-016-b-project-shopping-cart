const buttonEsvaziarCarrinho = document.querySelector('.empty-cart');
const ol = document.querySelector('.cart__items');
const sectionLoadingPai = document.querySelector('.clear-loading');
const price = document.querySelector('.total-price');

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

const loading = () => {
  sectionLoadingPai.innerHTML = '';
};

let soma = 0;
function somaCarrinho(param) {
  soma += param;
  price.innerText = soma;
}

const subtrair = (valorProduto) => {
  soma -= valorProduto;
  price.innerText = soma;
};

function cartItemClickListener(event) {
  const alvo = event.target.innerText;
  const valor = Number(alvo.split('PRICE: $')[1]);
  subtrair(valor);
  ol.removeChild(event.target);
  // salvar o item ao recarregar a página no localStorage
  saveCartItems(ol.innerHTML);
}

const adicionaEvento = () => {
  ol.innerHTML = getSavedCartItems();
  // tratando a localStorageLi
  const localStorageLi = document.querySelectorAll('.cart__item');
  localStorageLi.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  somaCarrinho(salePrice);
  return li;
}

async function itemCarrinho(event) {
  const buscaSKU = getSkuFromProductItem(event.target.parentNode);
  const arrayBruto = await fetchItem(buscaSKU);
  const carrinho = createCartItemElement(arrayBruto);
  ol.appendChild(carrinho);
  // forma de salvar os itens no carrinho.
  saveCartItems(ol.innerHTML);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', itemCarrinho);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  loading();
  return section;
}

const fetchObjeto = async () => {
  const arrayBruto = await fetchProducts('computador');
  arrayBruto.results.forEach((arr) => {
    const section = document.querySelector('.items');
    const result = createProductItemElement(arr);
    section.appendChild(result);
  });
};

// esvaziar carrinho com button
buttonEsvaziarCarrinho.addEventListener('click', () => {
  ol.innerHTML = '';
  price.innerText = 0;
  saveCartItems(ol.innerHTML);
});

window.onload = () => {
  fetchObjeto();
  adicionaEvento();
};
