const itemsSection = document.querySelector('.items');
const olList = document.querySelector('.cart__items');
const spanPrice = document.querySelector('.total-price');
const voidButton = document.querySelector('.empty-cart');

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const totalPricer = (price, operator) => {
  let valorAtual = parseFloat(spanPrice.innerHTML);
  if (operator === '-') {
    valorAtual -= price;
  } else if (operator === '+') {
    valorAtual += price;
  }
  spanPrice.innerHTML = valorAtual;
};

const cleanUpCart = () => {
  voidButton.addEventListener('click', () => {
    olList.innerHTML = ' ';
    totalPricer(spanPrice.innerHTML, '-');
    saveCartItems();
  });
};

// ref sobre regex https://stackoverflow.com/questions/30973173/get-all-prices-with-from-string-into-an-array-in-javascript

function cartItemClickListener(event) {
  totalPricer(Number(((event.target.innerText)
    .match(/\$((?:\d|,)*\.?\d+)/g)[0]).replace('$', '')), '-');
  event.target.remove();
  saveCartItems(event.target.id);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  olList.appendChild(li);
  totalPricer(salePrice, '+');
  saveCartItems(li.id);
}

const toCreateItemCarts = async (fetcherObj) => {
  const params = {
    sku: fetcherObj.id,
    name: fetcherObj.title,
    salePrice: fetcherObj.price,
  };

  return createCartItemElement(params);
};

const listen = async (param) => {
  const result = (toCreateItemCarts(param));
  return result;
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', async (event) => {
      listen(await fetchItem(getSkuFromProductItem(event.target.parentNode)));
    });
  }
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

const toCreateResultList = async (fetcher) => {
  const params = await fetcher.map((eachItem) => ({
    sku: `${eachItem.id}`,
    name: `${eachItem.title}`,
    image: `${eachItem.thumbnail}`,
  }));

  return params.map((eachParam) => itemsSection.appendChild(createProductItemElement(eachParam)));
};

window.onload = async () => {
  const resultsList = await fetchProducts('computador');
  await toCreateResultList(resultsList.results);
  cleanUpCart();
  if (localStorage.cartItems !== undefined) {
    await getSavedCartItems().forEach(async (id) => listen(await fetchItem(id)));
  } 
  // olList.addEventListener('click', cartItemClickListener);
};
