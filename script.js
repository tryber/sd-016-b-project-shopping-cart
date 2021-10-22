const cartItems = document.querySelector('.cart__items');

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
}
const loadLocalStorage = () => {
  const loadCart = getSavedCartItems();
  cartItems.innerHTML = loadCart;
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

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const appendCartItem = async (sku) => {
  const item = await fetchItem(sku);
  cartItems.appendChild(createCartItemElement(item));
  saveCartItems(cartItems.innerHTML);
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.addEventListener('click', () => appendCartItem(sku));

  return section;
}
// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// como queria um código mais dinâmico, deixei um parametro default como computador, 
// mas ainda com a possibilidade de chamar a função com outro parametro; 
const displayProducts = (SearchedProduct = 'computador') => {
  const resultsParent = document.querySelector('.items');
  fetchProducts(SearchedProduct).then((products) => {
    products.results.forEach((product) => {
      const displayProduct = createProductItemElement(product);
      resultsParent.appendChild(displayProduct);
    });
  });
};

window.onload = () => { 
  displayProducts();
  loadLocalStorage();
};
