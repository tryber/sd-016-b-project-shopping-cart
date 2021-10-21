const items = document.querySelector('.items');
const cartItem = document.querySelector('cart__items');

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadPage = () => {
  fetchProducts('computador')
    .then((data) => data.results)
    .then((products) => {
    products.forEach((product) => {
      const item = createProductItemElement(product);
      items.appendChild(item);
    });
  });
};

const addItemOnCart = (id) => {
  fetchItem(id)
    .then((products) => {
      const ItemOnCart = createCartItemElement(products);
      cartItem.appendChild(ItemOnCart);
    });
};

const addProduct = (event) => {
  if (event.target.classList.contains('item_add')) {
    const id = event.target.parentNode.firstChild.innerText;
    addItemOnCart();
    saveCartItems();
  }
};

window.onload = () => { 
  loadPage();
  items.addEventListener('click', addProduct);
  cartItem.addEventListener('click', cartItemClickListener);
};
