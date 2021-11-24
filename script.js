const selectedItemCart = document.querySelector('.cart__items');

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
  const selected = event.target;
  selected.remove();
  saveCartItems(selectedItemCart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemCart(itemId) {
  const addItemsCart = await fetchItem(itemId);
  const { id, title, price } = addItemsCart;
  selectedItemCart.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  saveCartItems(selectedItemCart.innerHTML);
}

const buttonAddItemCart = () => {
  const btAddItem = document.querySelectorAll('.item__add');    
    btAddItem.forEach((button) => button.addEventListener('click', (event) => {
      addItemCart(event.target.parentElement.firstChild.innerText);
  }));
};

const loadStorage = () => {
  selectedItemCart.innerHTML = getSavedCartItems();
  selectedItemCart.childNodes.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
};

// função para listar os produtos

async function listProducts() {
  const fetchProductsItems = await fetchProducts('computador');
  const { results } = fetchProductsItems;
  results.forEach(({ id, title, thumbnail }) => {
    const productItem = createProductItemElement({
      sku: id,
      name: title,
      image: thumbnail,
    });
    const listItems = document.querySelector('.items');
    listItems.appendChild(productItem);
  });
  buttonAddItemCart();
}

window.onload = () => {
  listProducts();
  loadStorage();
};
