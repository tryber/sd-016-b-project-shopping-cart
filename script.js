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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const cartItems = document.querySelector('.cart__items');

async function cartItemClickListener(event) {
  // coloque seu código aqui
  for (let index = 0; index < cartItems.children.length; index += 1) {
    if (cartItems.children[index] === event.target) {
      cartItems.removeChild(cartItems.children[index]);
    }
  }
  const cart = document.querySelector('.cart');
  let id = (event.target.innerHTML).slice(0, 18).slice(5);
  id = await fetchItem(id);
  console.log(id.price);

  cart.lastElementChild
    .lastElementChild
    .innerText = parseFloat(cart.lastElementChild.lastElementChild.innerText) - id.price;

  localStorage.setItem('cartValue', cart.lastElementChild.innerHTML);

  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createCartItems = async (item) => {
  const sku = item.id;
  const name = item.title;
  const salePrice = item.price;
  cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
  saveCartItems(cartItems.innerHTML);
};
const cart = document.querySelector('.cart');

const addCartValue = (item) => {
  if (cart.lastElementChild.lastElementChild === null) {
    const priceCartContainer = document.createElement('div');
    const text = document.createElement('span');
    text.innerText = 'Valor Total: ';
    const price = document.createElement('span');
    price.className = 'total-price';
    price.innerText = `${item.price}`;
    priceCartContainer.appendChild(text);
    priceCartContainer.appendChild(price);
    cart.appendChild(priceCartContainer);
    localStorage.setItem('cartValue', cart.lastElementChild.innerHTML);
  } else {
    cart.lastElementChild.lastElementChild
      .innerText = parseFloat(cart.lastElementChild.lastElementChild.innerText) + item.price;
    localStorage.setItem('cartValue', cart.lastElementChild.innerHTML);
  }
};

const addToCart = async (event) => {
  const id = event.target.parentElement.firstElementChild.innerText;
  const item = await fetchItem(id);
  createCartItems(item);
  addCartValue(item);
};

const generateItems = async () => {
  const items = await fetchProducts('computador');
  const newItems = [];
  items.results.forEach((item) => {
    const sku = item.id;
    const name = item.title;
    const image = item.thumbnail;
    newItems.push({ sku, name, image });
  });
  return newItems;
};

const createSections = async () => {
  const listItem = await generateItems();
  const sectionItem = document.querySelector('.items');
  listItem.forEach((item, index) => {
    sectionItem.appendChild(createProductItemElement(item));
    const buttonAdd = document.querySelectorAll('.item__add')[index];
    buttonAdd.addEventListener('click', addToCart);
  });
};

const loadCartItems = () => {
  cartItems.innerHTML = getSavedCartItems();

  for (let index = 0; index < cartItems.children.length; index += 1) {
    cartItems.children[index].addEventListener('click', cartItemClickListener);
  }
};

const clearButton = document.querySelector('.empty-cart');
clearButton.addEventListener('click', () => {
  for (let index = 0; index < cartItems.children.length; index = 0) {
    cartItems.removeChild(cartItems.children[index]);
  }
  cart.lastElementChild.lastElementChild
    .innerText = 0;
  localStorage.setItem('cartValue', cart.lastElementChild.innerHTML);
  saveCartItems(cartItems.innerHTML);
});

window.onload = () => {
  createSections();
  loadCartItems();
  const container = document.createElement('div');
  container.innerHTML = localStorage.getItem('cartValue');
  cart.appendChild(container);
};
