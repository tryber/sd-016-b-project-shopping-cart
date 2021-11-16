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
  const product = event.target;
  const productList = event.target.parentNode;
  productList.removeChild(product);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(event) {
  const itemId = event.target.parentNode.firstChild.innerText;
  const itemSelected = await fetchItem(itemId);
  const cartList = document.querySelector('.cart__items');
  const itemObject = {
    sku: itemSelected.id,
    name: itemSelected.title,
    salePrice: itemSelected.price,
  };

  const cartItem = createCartItemElement(itemObject);
  cartList.appendChild(cartItem);
}

async function searchProducts(product) {
  const returnedProducts = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  returnedProducts.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const researchedProducts = createProductItemElement(itemObject);
    researchedProducts.lastChild.addEventListener('click', addItemToCart);
    sectionItems.appendChild(researchedProducts);
  });
}

window.onload = () => {
  searchProducts('computador');
};

// Requisito 1 - Feito com auxilio do video disponibilizado no slack pelo Prof. Bernardo.
