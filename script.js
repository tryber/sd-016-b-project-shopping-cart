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

const addToCart = async (event) => {
  const section = event.target.parentNode;
  const itemID = getSkuFromProductItem(section);
  const itemInfo = await fetchItem(itemID);
  const itemObject = {
    sku: itemInfo.id,
    name: itemInfo.title,
    salePrice: itemInfo.base_price,
  };

  const cartList = document.querySelector('.cart__items');
  const cartItem = createCartItemElement(itemObject);
  cartList.appendChild(cartItem);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', addToCart);
  section.appendChild(btn);
  
  return section;
}

async function getProducts(product) {
  const fetchedProducts = await fetchProducts(product);
  const itemSection = document.querySelector('.items');
  fetchedProducts.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    itemSection.appendChild(createProductItemElement(itemObject));
  });
}

window.onload = () => {
  getProducts('computador');
};
