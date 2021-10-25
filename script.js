const ol = document.querySelector('.cart__items');

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

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(ol.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function saveItemValue() {
  ol.innerHTML = getSavedCartItems();
  const liItem = document.querySelectorAll('.cart__item');
  liItem.forEach((l) => l.addEventListener('click', cartItemClickListener));
}

async function addItemCart(event) {
const textId = getSkuFromProductItem(event.target.parentNode);
const idItem = await fetchItem(textId);
const itemcar = createCartItemElement(idItem);
ol.appendChild(itemcar);
saveCartItems(ol.innerHTML);
}

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
  ol.innerText = '';
};
