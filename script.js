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
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const creatWithArrayItens = async () => {
  const catchItens = document.querySelector('.items');
  const itensList = await fetchProducts('computador');
  const itensListFiltred = itensList.results.map(({ id, title, thumbnail }) =>
    ({ sku: id, name: title, image: thumbnail }));
  itensListFiltred.forEach((element) =>
    catchItens.appendChild(createProductItemElement(element)));
};
const creatItensOnShoppingCart = async (id) => {
  const catchCart = document.querySelector('.cart__items');
  const item = await fetchItem(id);
  catchCart.appendChild(createCartItemElement(item));
};
const getIdItem = (item) => item.target.parentNode.firstChild.innerText;

window.onload = () => {
  /* usei o codigo a baixo do para fazer dinamicamente a inclusão de itens https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript */
  creatWithArrayItens();
  document.addEventListener('click', (item) => {
    if (item.target && item.target.classList.contains('item__add')) {
      creatItensOnShoppingCart(getIdItem(item));
    }
  });
};