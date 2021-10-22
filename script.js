const list = document.querySelector('.cart__items');

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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
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
  event.target.remove();
  saveCartItems(list.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadProducts = async () => {
  await fetchProducts('computador')
  .then((data) => data.results)
  .then((products) => {
    const items = document.querySelector('.items');
    products.forEach((product) => {
      const item = createProductItemElement(product);
      items.appendChild(item);
    });
  });
};

const getId = (e) => {
  const findID = e.target.parentNode.firstChild.innerText;
  return findID;
};

const addProductCart = async (id) => {
  const product = await fetchItem(id);
  // console.log(fetchItem(id));
  const addProduct = createCartItemElement(product);
  const cartItems = document.querySelector('.cart__items');
  cartItems.appendChild(addProduct);

  saveCartItems(list.innerHTML);
};

const eventListenerToAddProduct = () => {
  document.addEventListener('click', function (e) {
  if (e.target.classList.contains('item__add')) {
    addProductCart(getId(e));
  }
  if (e.target.classList.contains('cart__item')) {
    cartItemClickListener(e);
  }
});
};

const saveOnStorage = () => {
  const inHTMLCart = getSavedCartItems();
  list.innerHTML = inHTMLCart;
};

window.onload = () => { 
  loadProducts();
  eventListenerToAddProduct();
  saveOnStorage();
};
