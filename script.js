const elementoItems = document.querySelector('.items');
const elementoCart = document.querySelector('.cart__items');
const valorTotal = document.querySelector('.total-price');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  elementoCart.removeChild(event.target);
  saveCartItems(elementoCart.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const somaValores = (param) => {
  const valorSet = parseFloat(valorTotal.innerText);
  valorTotal.innerText = param + valorSet;
};

const addItemCart = async (event) => {
  const item = event.target.parentElement.firstChild.innerText;
  await fetchItem(item)
    .then((valor) => { elementoCart.appendChild(createCartItemElement(valor));
      somaValores(valor.price);
    });
    saveCartItems(elementoCart.innerHTML);
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') e.addEventListener('click', addItemCart);
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

const getItems = (objeto) => {
  objeto.forEach((element) => {
    elementoItems.appendChild(createProductItemElement({ 
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    }));
  });
};

fetchProducts('computador')
  .then((response) => getItems(response.results));

const funcCarregaPg = () => {
  elementoCart.innerHTML = getSavedCartItems();
  const seila = document.querySelectorAll('.cart__item');
  seila.forEach((elemen) => {
    elemen.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  funcCarregaPg();
};
