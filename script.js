const list = document.querySelector('.items');
const cartlist = document.querySelector('.cart__items');
const totalprice = document.querySelector('.total-price');

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
  cartlist.removeChild(event.target);
  saveCartItems(cartlist.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

/** Atribui o status carregando; */
const requestLoading = () => {
  const loading = document.querySelector('.loading');
  const p = document.createElement('p');
  const img = document.createElement('img');
  img.setAttribute('src', 'loading.gif');
  img.style.width = '20px';
  img.style.height = '20px';
  p.innerHTML = 'carregando';
  p.appendChild(img);

  if (loading.hasChildNodes()) {
    loading.removeChild(loading.firstChild);
  } else {
    loading.appendChild(p);
  }
};

/** Monta a lista de produtos; */
const assemblyProducts = async (query) => {
  requestLoading();
  const { results } = await fetchProducts(query);
  requestLoading();
  results.forEach((i) => {
    const item = {
      sku: i.id,
      name: i.title,
      image: i.thumbnail,
    };
    list.appendChild(createProductItemElement(item));
  });
};

/** Esvazia o carrinho de compras; */
const clearCartList = () => {
  if (localStorage.getItem('cartItems') !== null) {
    cartlist.innerHTML = '';
    localStorage.clear();
  }
};

const addInShoppingCart = async ({ target }) => {
  const elementId = getSkuFromProductItem(target.parentNode);
  const element = await fetchItem(elementId);
  const object = {
    sku: element.id,
    name: element.title,
    salePrice: element.price,
  };
  const item = createCartItemElement(object);
  cartlist.appendChild(item);
  saveCartItems(cartlist.innerHTML);
};

const loadCart = () => {
  if (localStorage.getItem('cartItems') !== null) {
    cartlist.innerHTML = getSavedCartItems();
  }
};

/** Main Thread; */
window.onload = async () => {
  await assemblyProducts('computador');
  loadCart();
  document.querySelector('.empty-cart').addEventListener('click', clearCartList);
  document.querySelectorAll('.item__add').forEach((item) => {
    item.addEventListener('click', addInShoppingCart);
  });
};
