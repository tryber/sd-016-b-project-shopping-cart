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

const appendByClass = (className, childName) => {
  const fathers = document.getElementsByClassName(className);

  for (let index = 0; index < fathers.length; index += 1) {
    fathers[index].appendChild(childName);
  }
};

const getfetchItem = async (id) => {
  const { id: sku, title: name, price: salePrice } = await fetchItem(id);
  const itemElement = createCartItemElement({ sku, name, salePrice });

  appendByClass('cart__items', itemElement);
};

const itemAdd = () => {
  const button = document.getElementsByClassName('item__add');
  // const lastButton = button.parentElement.lastElementChild;
  
  for (let index = 0; index <= button.length; index += 1) {
    button[index].addEventListener('click', (element) => {
      const sku = element.target.parentElement.firstChild.innerText;
      getfetchItem(sku);
    });
  }
};

const getfetchProducts = async () => {
  const { results: products } = await fetchProducts('computador');

  products.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const itemElement = createProductItemElement({ sku, name, image });

    appendByClass('items', itemElement);
  });

  itemAdd();
};

window.onload = () => {
  getfetchProducts();
  // getfetchItem();
};
