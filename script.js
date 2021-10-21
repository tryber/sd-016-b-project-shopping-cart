const itemsSection = document.querySelector('.items');
const olList = document.querySelector('.cart__items');

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return (olList.appendChild(li));
}

const toCreateItemCarts = async (fetcherObj) => {
  const params = {
    sku: fetcherObj.id,
    name: fetcherObj.title,
    salePrice: fetcherObj.price,
  };
  return createCartItemElement(params);
};

const listen = async (param) => {
  const result = (await toCreateItemCarts(await fetchItem(await getSkuFromProductItem(param))));
  return result;
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', (event) => {
      listen(event.target.parentNode);
    });
  }
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

const toCreateResultList = async (fetcher) => {
  const params = await fetcher.map((eachItem) => ({
    sku: `${eachItem.id}`,
    name: `${eachItem.title}`,
    image: `${eachItem.thumbnail}`,
  }));

  return params.map((eachParam) => itemsSection.appendChild(createProductItemElement(eachParam)));
};

window.onload = async () => {
  const resultsList = await fetchProducts('computador');
  await toCreateResultList(resultsList.results);
};
