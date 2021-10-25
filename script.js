const itemsInCart = document.querySelector('.cart__items');

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
  const removeItem = event.target;
  removeItem.remove();
  saveCartItems(itemsInCart.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts(products) {
  const searchData = await fetchProducts(products);
  const sectionItem = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    const productItem = createProductItemElement(itemObject);
    sectionItem.appendChild(productItem);
  });
}

const loadProducts = async () => {
  await fetchProducts('computador')
  .then((data) => data.results)
  .then((products) => {
    const items = document.querySelector('.items');
    products.forEach((product) => {
      const item = createProductItemElement(product);
      items.appendChild(item);
    });
  });
};

function getId(e) {
  const innerTxtId = e.target.parentNode.firstChild.innerText;
  return innerTxtId;
}

const addItemToCart = async (id) => {
  const product = await fetchItem(id);
  const productAdd = createCartItemElement(product);
  document.getElementsByClassName('cart__items')[0].appendChild(productAdd);
  saveCartItems(itemsInCart.innerHTML);
};

function loadItemsCart() {
  const cartItemList = getSavedCartItems();
  itemsInCart.innerHTML = cartItemList;
}

window.onload = () => { 
  searchProducts('computador');
  loadItemsCart();
  
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('item__add')) {
      addItemToCart(getId(e));
    }
    if (e.target && e.target.classList.contains('cart__item')) {
      cartItemClickListener(e);
    }
  });
};
