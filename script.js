const ol = document.querySelector('.cart__items');
const btnClear = document.querySelector('.empty-cart');

const createLoadingText = () => {
  const textArea = document.querySelector('body');
  const textH1 = document.createElement('h1');
  textH1.classList.add('loading');
  textH1.innerText = 'carregando...';
  textArea.appendChild(textH1);
};
const removeLoadingText = () => {
  const textH1 = document.querySelector('h1');
  textH1.remove();
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
ol.removeChild(event.target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
  }
 const cartItems = async (event) => {
  const getId = getSkuFromProductItem(event.target.parentElement);
  await fetchItem(getId)
  .then((data) => 
  ol.appendChild(createCartItemElement(data)));
  saveCartItems(ol.innerHTML);
  };

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') {
   e.addEventListener('click', cartItems);
  }
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item'; 

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

const render = async (product) => {
createLoadingText();
const theItems = await fetchProducts(product)
.then((data) => data.results);
const sectionItems = document.querySelector('.items');
theItems.forEach((result) => {
const sections = createProductItemElement(result);
 sectionItems.appendChild(sections);
 });
 removeLoadingText();
};

const removeAll = () => {
  while (ol.firstChild) {
    ol.removeChild(ol.firstChild);
  }
};
btnClear.addEventListener('click', removeAll);

window.onload = () => {
  render('computador');
  ol.innerHTML = getSavedCartItems();
  saveCartItems(ol.innerHTML);
};  
