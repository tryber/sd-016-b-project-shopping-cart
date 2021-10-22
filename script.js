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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const clearChart = event.target;
  clearChart.remove();
  }

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
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
// https://github.com/tryber/sd-016-b-project-shopping-cart/pull/83/commits/bc43666c2cb475550300a611cbed7fa5b7c441f2

function getId(e) {
  const innerTxtId = e.target.parentNode.firstChild.innerText;
  return innerTxtId;
}

const addItemCartElement = async (id) => {
  const prod = await fetchItem(id);
  const prodAdded = createCartItemElement(prod);
  document.getElementsByClassName('cart__items')[0].appendChild(prodAdded);
};

window.onload = () => { 
  loadProducts();

  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('item__add')) {
      addItemCartElement(getId(e));
    }
  });
};
