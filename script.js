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

function cartItemClickListener(event) {
  const price = document.querySelector('.price');
  const evt = event.target;
  evt.remove();
  const productPrice = evt.innerText.split('PRICE: $')[1];

  price.innerText = Number(price.innerText) - Number(productPrice);
}

function createCartItemElement({ sku, name, salePrice }) {
  const price = document.querySelector('.price');
  const li = document.createElement('li');

  price.innerText = Number(price.innerText) + salePrice;

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
}

async function selectProduct(product) {
  const selectedData = await fetchItem(product);
  const ol = document.querySelector('.cart__items');
  console.log(selectedData.id);

  const itemSelected = {
    sku: selectedData.id,
    name: selectedData.title,
    salePrice: selectedData.price,
  };

  const selectedItem = createCartItemElement(itemSelected);
  ol.appendChild(selectedItem);
  saveCartItems(ol.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  const title = createCustomElement('span', 'item__sku', sku);
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');

  section.className = 'item';

  section.appendChild(title);
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  button.addEventListener('click', function () {
    selectProduct(title.innerText);
  });

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    const productItem = createProductItemElement(itemObject);
    sectionItem.appendChild(productItem);
  });
}

window.onload = () => { 
  const cart = document.querySelector('ol');
  searchProducts('computador');
  cart.innerHTML = getSavedCartItems();
};
