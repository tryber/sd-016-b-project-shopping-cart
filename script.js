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
  // adsf
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function sell(e) {
  if (e.target.className.includes('item__add')) {
    // console.log(getSkuFromProductItem(event.target.parentElement));
    fetchItem(getSkuFromProductItem(e.target.parentElement))
      .then((c) => document.querySelector('.cart__items')
      .appendChild(createCartItemElement({ sku: c.id, name: c.title, salePrice: c.price })));
  }
  if (e.target.className.includes('cart__item')) {
    e.target.parentElement.removeChild(e.target);
  }
}

window.onload = () => {
  // configura página
  document.addEventListener('click', sell);

  // carrega produtos
  fetchProducts('computador').then((d) => {
    d.results
      .map((i) => ({ sku: i.id, name: i.title, image: i.thumbnail }))
      .forEach((p) => document.querySelector('.items').appendChild(createProductItemElement(p)));
  });
};
