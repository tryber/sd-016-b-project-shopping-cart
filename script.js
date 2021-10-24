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
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const addProduct = async () => {
  const products = await fetchProducts('computador');
  const sectionPai = document.querySelector('.items');

  products.results.forEach((prod) => {
    const product = createProductItemElement(prod);
    sectionPai.appendChild(product);
  });
};

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener() {
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getId(event) {
  const innerTxtId = event.target.parentNode.firstChild.innerText;
  return innerTxtId;
}

const addProductToCart = async (itemID) => {
  const item = await fetchItem(itemID);
  const addItem = createCartItemElement(item);
  document.querySelector('.cart__items').appendChild(addItem);
};

window.onload = () => {
  addProduct();
  document.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('item__add')) {
      addProductToCart(getId(event));
    }
  });
};
