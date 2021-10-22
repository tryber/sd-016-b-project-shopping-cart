const unstructureList = async (url) => {
  const result = await fetchProducts(url);
  const data = await result.results;
  const response = await data.map((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    return { sku, name, image };
  });
  return response;
};

const itens = unstructureList('computador');

const unstructureItem = async (idProduct) => {
  const result = await fetchItem(idProduct);
  const { id: sku, title: name, price: salePrice } = await result;
  const response = await { sku, name, salePrice };
  return response;
};

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  localStorage.removeItem(event.target.id);
  return event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createNavigation = () => {
  const productList = document.querySelector('.items');
  itens.then((item) => item.forEach((element) => {
    const { sku, name, image } = element;
    productList.appendChild(createProductItemElement({ sku, name, image }));
  }));
};

const addItemCart = async (event) => {
  const productCarts = document.querySelector('.cart__items');
  const { sku, name, salePrice } = await unstructureItem(event);
  productCarts.appendChild(createCartItemElement({ sku, name, salePrice }));
  saveCartItems(productCarts.innerHTML);
};

createNavigation();

window.onload = () => {
  document.querySelector('.cart__items').innerHTML = getSavedCartItems();

  document.querySelector('.cart__items').addEventListener('click', cartItemClickListener);

  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      return addItemCart(event.target.parentNode.firstChild.innerText);
    }
  });
};
