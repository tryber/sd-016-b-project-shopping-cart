const olCart = document.querySelector('.cart__items');
const butEmpty = document.querySelector('.empty-cart');
const tagTotal = document.querySelector('.total-price');
const getBody = document.querySelector('body');

// Adicione um texto de "carregando" durante uma requisição à API

const loadText = (valBoll) => {
  const txt = document.createElement('span');
  
  if (!valBoll) {
    getBody.lastChild.remove();
  } else {
    txt.className = 'loading';
    txt.innerText = 'carregando...';
    getBody.appendChild(txt);
  }
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

const getTotalPrice = () => parseFloat(localStorage.getItem('totalPrice'));

const addUpdateTagTotal = (num) => {
  const numTotal = num.toFixed(2);
  tagTotal.innerText = '';
  tagTotal.innerText = `Total: R$ ${numTotal}`;
};
// Parei qui tentando transformar em inteiro
const saveSubtPriceTotal = async (val) => {
  let valTotalSub = getTotalPrice();
    valTotalSub -= val;
    addUpdateTagTotal(valTotalSub);
    localStorage.removeItem('totalPrice');
    localStorage.setItem('totalPrice', valTotalSub);
};

const updateOl = () => {
  localStorage.removeItem('cartItems');
  saveCartItems(JSON.stringify(olCart.innerHTML));
};

// Parei qui tentando transformar em inteiro
const cartItemClickListener = (event) => {
  const elemStr = event.innerText.split(' ');
  const str = elemStr[elemStr.length - 1];
  const a = parseFloat(str.slice(1));
  event.remove();
  saveSubtPriceTotal(a);
  updateOl();
};

const cartItemClickListener2 = (event) => {
  let srt = event.target.innerText.split(' ');
  srt = srt[srt.length - 1];
  const num = parseFloat(srt.slice(1));
  event.target.remove();
  saveSubtPriceTotal(num);
  updateOl();
};

const saveSumPriceTotal = async (val) => {
  let valTotal = getTotalPrice();
  if (valTotal) {
    valTotal += val;
    addUpdateTagTotal(valTotal);
    localStorage.removeItem('totalPrice');
    localStorage.setItem('totalPrice', valTotal);
  } else {
    localStorage.setItem('totalPrice', val);
    addUpdateTagTotal(val);
  }
};

const emptyCart = () => {
  butEmpty.addEventListener('click', () => {
    olCart.innerHTML = '';
    tagTotal.innerText = 'Total: R$ 0,00';
    localStorage.clear();
  });
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener2);
  emptyCart();
  return li;
}

async function addItemCart(id) {
  await fetchItem(id)
    .then((item) => {
      const { id: sku, title: name, price: salePrice } = item;
      olCart.appendChild(createCartItemElement({ sku, name, salePrice }));
      saveCartItems(JSON.stringify(olCart.innerHTML));
      saveSumPriceTotal(salePrice);
    });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const but = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  but.addEventListener('click', () => {
    addItemCart(sku);
  });
  section.appendChild(but);
  return section;
}

async function searchProducts(product) {
  const data = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  data.results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    sectionItem.appendChild(createProductItemElement({ sku, name, image }));
  });
  loadText(false);
}

const getTotalPriceStart = () => {
  const startTotal = getTotalPrice();
  if (startTotal) {
    addUpdateTagTotal(startTotal);
  }
};

const updateCartList = () => {
  const getCartList = JSON.parse(getSavedCartItems());
  olCart.innerHTML = getCartList;

  emptyCart();

  itemCart = document.querySelectorAll('.cart__item');
  itemCart.forEach((item) => {
    item.addEventListener('click', () => {
      cartItemClickListener(item);
    });
  });

  getTotalPriceStart();
};

window.onload = () => {
  searchProducts('computador');
  updateCartList();
  loadText(true);
};
