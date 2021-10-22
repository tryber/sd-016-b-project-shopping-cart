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

const getFirstElement = (element) => document.querySelector(element);

const cartList = getFirstElement('.cart__items');

const saveItemsCartForLocalStorage = () => {
  const cartListItems = cartList.innerHTML;

  saveCartItems(cartListItems);
};

// Fiz da forma abaixo para funcionar também, quando pegar do localstorage que é uma string;
const calcTotalCart = async () => {
  const totalPriceCart = getFirstElement('.total-price');
  const cartItem = document.getElementsByClassName('cart__item');

  let total = 0;
  for (let index = 0; index < cartItem.length; index += 1) {
    const elementoItem = cartItem[index].innerText;
    total += parseFloat(elementoItem.substring(elementoItem.indexOf('PRICE: $') + 8));
  }
  if (total) {
    totalPriceCart.innerText = total;
  } else {
    totalPriceCart.innerText = '';
  }
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();

  saveItemsCartForLocalStorage();
  calcTotalCart();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const appendByClass = (className, childName) => {
  const father = getFirstElement(`.${className}`);

  return father.appendChild(childName);
};

const getfetchItem = async (id) => {
  const { id: sku, title: name, price: salePrice } = await fetchItem(id);
  const itemElement = createCartItemElement({ sku, name, salePrice });

  return appendByClass('cart__items', itemElement);
};

const eventItemAdd = (event) => {
    event.lastElementChild.addEventListener('click', () => {
      // const sku = element.target.parentElement.firstChild.innerText;
      const sku = getSkuFromProductItem(event);
      getfetchItem(sku)
        .then(() => {
          saveItemsCartForLocalStorage();
          calcTotalCart();
        });
    });
};

const createElementLoading = () => {
  const sectionLoading = document.createElement('section');
  sectionLoading.className = 'loading';
  appendByClass('items', sectionLoading);

  const itemElement = createProductItemElement({ sku: undefined, name: 'Carregando', image: '' });
  appendByClass('loading', itemElement);
};

const clearElementLoading = () => {
  const sectionLoading = getFirstElement('.loading');
  sectionLoading.remove();
};

const getfetchProducts = async () => {
  createElementLoading();

  const { results: products } = await fetchProducts('computador');
  clearElementLoading();

  products.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const itemElement = createProductItemElement({ sku, name, image });

    const elementCart = appendByClass('items', itemElement);

    eventItemAdd(elementCart);
  });
};

const restoreCartListOfLocalStorage = () => {
  const elementListItem = getSavedCartItems();
  cartList.innerHTML = elementListItem;

  // O código abaixo foi necessário fazer pois, estou usando o innerHTML acima e não criando o item dinamicamente.
  const cartItem = document.getElementsByClassName('cart__item');
  for (let index = 0; index < cartItem.length; index += 1) {
    cartItem[index].addEventListener('click', cartItemClickListener);
  }

  calcTotalCart();
};

const clearCart = () => {
  cartList.innerHTML = '';

  saveItemsCartForLocalStorage();
  calcTotalCart();
};

const eventClearCart = () => {
  const buttonClear = getFirstElement('.empty-cart');

  buttonClear.addEventListener('click', clearCart);
};

window.onload = () => {
  getfetchProducts();
  restoreCartListOfLocalStorage();
  eventClearCart();
};
