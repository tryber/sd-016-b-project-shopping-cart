const items = document.querySelector('.items');

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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loading = () => {
  const loading = document.querySelector('.loading');
  const p = document.createElement('p');
  const img = document.createElement('img');
  img.setAttribute('src', 'loading.gif');
  img.style.width = '20px';
  img.style.height = '20px';
  p.innerHTML = 'carregando';
  p.appendChild(img);

  if (loading.hasChildNodes()) {
    loading.removeChild(loading.firstChild);
  } else {
    loading.appendChild(p);
  }
}

const assemblyProducts = async (item) => {
  loading();
  const { results } = await fetchProducts(item);
  loading();
  results.forEach((i) => {
    const item = {
      sku: i.id,
      name: i.title,
      image: i.thumbnail,
    };
    items.appendChild(createProductItemElement(item));
  });
};

window.onload = async () => {
  assemblyProducts('computador');
};
