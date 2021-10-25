const cart = document.querySelector('.cart__items');

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

function save() { 
  const n = [];
  cart.childNodes.forEach((i) => n.push(i.data));
  saveCartItems(JSON.stringify(n));
}

function cartItemClickListener(e) {
  if (e.target.className.includes('cart__item')) {
    cart.removeChild(e.target);
    save();
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.data = { sku, name, salePrice };
  return li;
}

function load() {
  const l = getSavedCartItems();
  if (l) JSON.parse(l).forEach((o) => cart.appendChild(createCartItemElement(o)));
}

function sell(e) {
  if (e.target.className.includes('item__add')) {
    fetchItem(getSkuFromProductItem(e.target.parentElement))
      .then((c) => {
        cart.appendChild(createCartItemElement({ sku: c.id, name: c.title, salePrice: c.price }));
        save();
    });
  }
}

window.onload = () => {
  // carrega o armazenamento local se houver
  load();

  // configura página
  document.addEventListener('click', sell);

  // carrega produtos
  fetchProducts('computador').then((d) => {
    d.results
      .map((i) => ({ sku: i.id, name: i.title, image: i.thumbnail }))
      .forEach((p) => document.querySelector('.items').appendChild(createProductItemElement(p)));
  });
};
