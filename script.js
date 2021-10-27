const shop_cart_items = document.querySelector('.cart__items');
const section_items = document.querySelector('.items');
const load = document.querySelector('.loading');
const btn_remove_items = document.querySelector('.empty-cart');

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

  const button = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  button.addEventListener('click', () => addProduct(sku));
  section.appendChild(button);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(event.target.parentNode);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
}

// Adiciona itens ao carrinho
const addProduct = async (item) => {
  const addData = await fetchItem(item);
  const addItem = {
    sku: addData.id,
    name: addData.title,
    salePrice: addData.price,
  };

  const itemSelect = createCartItemElement(addItem);
  shop_cart_items.appendChild(itemSelect);
  saveCartItems(item);
};

// Adiciona a lista de produtos na tela
const searchProducts = async (products) => {
  const searchData = await fetchProducts(products);
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    const productItem = createProductItemElement(itemObject);
    section_items.appendChild(productItem);
  });
};

// Botão para limpar carrinho
btn_remove_items.addEventListener('click', () => {
  shop_cart_items.innerHTML = '';
  localStorage.clear();
});

// Limpa o carrinho
shop_cart_items.addEventListener('click', () => {
  shop_cart_items.innerHTML = '';
  saveCartItems(shop_cart_items.innerHTML);
});

const loading = () => {
  const loading_API = document.createElement('h3');
  loading_API.className = 'loading';
  loading_API.innerText = 'carregando...';
  section_items.appendChild(loading_API);
};

const loadingRemove = () => load.remove();

window.onload = () => {
  searchProducts('computador');
};
