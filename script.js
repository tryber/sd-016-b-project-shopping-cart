// const getSavedCartItems = require("./helpers/getSavedCartItems");
// const saveCartItems = require("./helpers/saveCartItems");

const itensCart = document.querySelector('.cart__items');

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
  const sectionParent = document.querySelector('.items');

  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  sectionParent.appendChild(section);

  return section;
}

const setProducts = async () => {
  const array = await fetchProducts('computador');
  array.results.forEach((item) => createProductItemElement(item));
};

setProducts();

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(itensCart.innerHTML);
}

function cartListener() {
  itensCart.addEventListener('click', cartItemClickListener);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  // console.log(itensCart);
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  itensCart.appendChild(li); 
  saveCartItems(itensCart.innerHTML);
}

const cartAddtems = () => {
  const setbutton = document.querySelector('.items');

  setbutton.addEventListener('click', (event) => {
    if (event.target.className === 'item__add') {
      const idItem = event.target.parentNode.firstChild.innerText;
      // console.log(idItem);
      fetchItem(idItem)
        .then((data) => createCartItemElement(data));
      // saveCartItems(itensCart.innerHTML);
   } 
  });
};

const storageSave = () => {
  const cartSave = getSavedCartItems();
  itensCart.innerHTML = cartSave;
};

window.onload = () => {   
  cartAddtems();
  storageSave();
  cartListener();
};