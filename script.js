const list = document.querySelector('.items');
const cartlist = document.querySelector('.cart__items');
const totalprice = document.querySelector('.total-price');
const loading = document.querySelector('.loading');
let total = 0;

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

const saveTotalPrice = () => {
  localStorage.setItem('cart-tprice', total);
};

const cartItemClickListener = async ({ target }) => {
  cartlist.removeChild(target);
  const element = await fetchItem(target.querySelector('.cart-itemid').innerHTML);
  totalprice.innerHTML = (total -= parseInt(element.price)).toFixed(2);
  saveCartItems(cartlist.innerHTML);
  saveTotalPrice();
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';

  const span = document.createElement('span');
  span.setAttribute('class', 'cart-itemid');
  span.innerHTML = `${sku}`;
  span.style.display = 'none';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.appendChild(span);
  return li;
}

/** Monta a lista de produtos; */
const assemblyProducts = async (query) => {
  loading.innerHTML = 'carregando';
  const { results } = await fetchProducts(query);
  loading.remove();
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
    cartlist.innerHTML = null;
    totalprice.innerHTML = null;
    total = 0;
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
  totalprice.innerHTML = (total += parseInt(element.price)).toFixed(2);

  const item = createCartItemElement(object);
  cartlist.appendChild(item);
  saveCartItems(cartlist.innerHTML);
  saveTotalPrice();
};

const loadCart = () => {
  if (localStorage.getItem('cartItems') !== null) {
    cartlist.innerHTML = getSavedCartItems();
    document.querySelectorAll('.cart__items li')
      .forEach((element) => element.addEventListener('click', cartItemClickListener));
    totalprice.innerHTML = localStorage.getItem('cart-tprice');
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
