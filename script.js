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

function getFromLocalStorage() {
  const getSavedItems = getSavedCartItems();
  document.querySelector('.cart_items').innerHTML = getSavedItems;
}

function saveInLocalStorage() {
  const itemsToSave = document.querySelector('.cart_items').innerHTML;
  saveCartItems(itemsToSave);
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', saveInLocalStorage);
  return li;
}

const addToCart = async (event) => {
  const cartItemsList = document.querySelector('.cart__items');
  const addBttn = await event.target.parentNode;
  const getItemId = await addBttn.firstChild.innerText;
  const itemInfos = await fetchItem(getItemId);
  const { id, title, price } = itemInfos;
  const itemObject = {
    sku: id,
    name: title,
    salePrice: price,
  };
  const cartItems = createCartItemElement(itemObject);
  cartItemsList.appendChild(cartItems);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  const addToCartBttn = document.querySelectorAll('.item__add');
  for (let index = 0; index < addToCartBttn.length; index += 1) {
    addToCartBttn[index].addEventListener('click', addToCart);
    addToCartBttn[index].addEventListener('click', saveInLocalStorage);
  }
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function searchedProducts(product) {
  const searchData = await fetchProducts(product);
  document.querySelector('.loading').remove();
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

function cleanEntireCart() {
  const cartItems = document.querySelector('.cart__items');
  cartItems.innerHTML = '';
}

const cleanBttn = document.querySelector('.empty-cart');

cleanBttn.addEventListener('click', cleanEntireCart);

window.onload = () => {
  searchedProducts('computador');
  document.querySelector('.loading').innerText = 'carregando';
  cleanEntireCart();
  getFromLocalStorage();
};
