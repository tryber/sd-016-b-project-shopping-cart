const shopCartItems = document.querySelector('.cart__items');
const sectionItems = document.querySelector('.items');
const load = document.querySelector('.loading');
const btnRemoveItems = document.querySelector('.empty-cart');

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
  shopCartItems.appendChild(itemSelect);
  saveCartItems(item);
};

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
    sectionItems.appendChild(productItem);
  });
};

// Botão para limpar carrinho
btnRemoveItems.addEventListener('click', () => {
  shopCartItems.innerHTML = '';
  localStorage.clear();
});

// Limpa o carrinho
shopCartItems.addEventListener('click', () => {
  shopCartItems.innerHTML = '';
  saveCartItems(shopCartItems.innerHTML);
});

const loading = () => {
  const loadingAPI = document.createElement('h3');
  loadingAPI.className = 'loading';
  loadingAPI.innerText = 'carregando...';
  sectionItems.appendChild(loadingAPI);
};

const loadingRemove = () => load.remove();

window.onload = () => {
  searchProducts('computador');
};
