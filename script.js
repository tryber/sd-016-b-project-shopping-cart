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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  const li = event.target;
  li.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemCart(id) {
  const olCart = document.querySelector('.cart__items');
  await fetchItem(id)
    .then((item) => {
      const { id: sku, title: name, price: salePrice } = item;
      saveCartItems({ sku, name, salePrice });
      return olCart.appendChild(createCartItemElement({ sku, name, salePrice }));
    });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const but = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  but.addEventListener('click', () => addItemCart(sku));
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
}

const updateCartList = () => {
  const olUpdate = document.querySelector('.cart__items');
  const getCartList = JSON.parse(getSavedCartItems());
  Object.entries(getCartList).forEach((e) => {
    const { sku, name, salePrice } = e[1];
    olUpdate.append(createCartItemElement({ sku, name, salePrice }));
  });
};

window.onload = () => {
  searchProducts('computador');
  updateCartList();
};
