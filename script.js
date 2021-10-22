const cartList = document.querySelector('.cart__items');
const cleanButton = document.querySelector('.empty-cart');
const listOfItems = document.querySelector('.items');
const totalPriceTag = document.querySelector('.total-price');
let total = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  const valueToDecrease = parseFloat(event.target.innerText.split('$')[1], 10);
  total -= valueToDecrease;
  renderTotalPrice();
  localStorage.setItem('totalPrice', total.toFixed(2));
  cartList.removeChild(event.target);
  saveCartItems(cartList.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addProductsToCart = async (event) => {
  const identification = event.target.previousSibling.previousSibling.previousSibling.innerText;
  await fetchItem(identification).then((response) => {
        const element = createCartItemElement(response);
        cartList.appendChild(element);
        const valueToIncrease = response.price;
        total += valueToIncrease;
        renderTotalPrice();
        localStorage.setItem('totalPrice', total.toFixed(2));
        saveCartItems(cartList.innerHTML);
  });
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') {
    e.addEventListener('click', addProductsToCart);
  }
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

const createItemsObject = (items) => {
  items.forEach((item) => listOfItems.appendChild(createProductItemElement({
    sku: item.id,
    name: item.title,
    image: item.thumbnail,
  })));
};

const renderListOfProducts = () => {
  fetchProducts('computador')
    .then((response) => createItemsObject(response.results));
};

addClickListenerToStorageItems = () => {
  const items = document.querySelectorAll('.cart__item');
  if (items.length !== 0) {
    items.forEach((item) => {
      item.addEventListener('click', cartItemClickListener);
    });
  }
};

renderTotalPrice = () => {
  totalPriceTag.innerText = `$${total.toFixed(2)}`;
};

loadStorageCartItems = () => {
  cartList.innerHTML = getSavedCartItems();
  const totalPrice = parseFloat(localStorage.getItem('totalPrice'));
  total = totalPrice;
  renderTotalPrice();
};

window.onload = () => {
  renderListOfProducts();
  loadStorageCartItems();
  addClickListenerToStorageItems();
};
