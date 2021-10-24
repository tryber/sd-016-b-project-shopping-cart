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

async function searchProducts(product) {
  const searchData = await fetchProducts(product);

  const sectionItems = document.querySelector('.items');

  // console.log(searchData);

  searchData.results.forEach((element) => {
    const productItem = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const section = createProductItemElement(productItem);
    sectionItems.appendChild(section);
  });
}

async function addToCart(productId) {
  const cartList = document.querySelector('.cart__items');
  // console.log(cartList);
  const search = await fetchItem(productId);
  // console.log(search);
  const obj = {
    sku: search.id,
    name: search.title,
    salePrice: search.price.toFixed(2),
  };
  const result = createCartItemElement(obj);
  cartList.appendChild(result);
}

window.onload = () => {
  searchProducts('computador');
  addToCart('MLB1341706310');
  addToCart('MLB1937267358');
  addToCart('MLB2042688496');
  addToCart('MLB1078149937');
};
