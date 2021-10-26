const cart = document.querySelector('.cart__items');
const priceSpan = document.querySelector('.total-price');

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

const subTotalPrice = (price) => {
  const total = Number(priceSpan.innerHTML) - price;
  // const totalFormat = (total).toFixed(2);
  priceSpan.innerHTML = total;
  localStorage.setItem('cartTotal', total);
};

function cartItemClickListener(event) {
  const element = event.target;
  const priceSplit = element.innerText.split('PRICE: $');
  subTotalPrice(priceSplit[1]);
  element.remove();
  localStorage.setItem('cartItems', cart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadingObj = {
  items: document.querySelector('.items'),
  show() {
    const h1 = document.createElement('h1');
    h1.classList.add('loading');
    h1.innerText = 'Loading...';
    this.items.appendChild(h1);
  },
  hide() {
    const h1 = this.items.querySelector('.loading');
    h1.remove();
  },
};

const renderProducts = async () => {
  const items = document.querySelector('.items');
  const { results } = await fetchProducts('computador');
  loadingObj.hide();
  results.forEach((product) => {
    const { id, title, thumbnail } = product;
    const productData = { sku: id, name: title, image: thumbnail };
    items.appendChild(createProductItemElement(productData));
  });
};

const saveCart = () => {
  saveCartItems(cart.innerHTML);
};

const renderCart = () => {
  cart.innerHTML = getSavedCartItems();
  const items = cart.childNodes;
  items.forEach((item) => item.addEventListener('click', cartItemClickListener));
  priceSpan.innerHTML = localStorage.getItem('cartTotal');
};

const sumTotalPrice = (price) => {
  const total = Number(priceSpan.innerHTML) + price;
  // const totalFormat = (total).toFixed(2);
  priceSpan.innerHTML = total;
  localStorage.setItem('cartTotal', total);
};

const addItemToCart = () => {
  const buttons = document.querySelectorAll('.item__add');

  buttons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { parentElement } = e.target;
      const productSku = getSkuFromProductItem(parentElement);
      const { 
        id: sku, 
        title: name, 
        price: salePrice,
      } = await fetchItem(productSku);

      cart.appendChild(createCartItemElement({ sku, name, salePrice }));
      saveCart();
      sumTotalPrice(salePrice);
    });
  });
};

const cleanCartListener = () => {
  const cleanCartBtn = document.querySelector('.empty-cart');
  cleanCartBtn.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTotal');
    cart.innerHTML = '';
    priceSpan.innerHTML = '';
  });
};

window.onload = async () => {
  loadingObj.show();
  await renderProducts();
  renderCart();
  cleanCartListener();
  addItemToCart();
};
