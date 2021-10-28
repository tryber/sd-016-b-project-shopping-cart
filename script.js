const shopCartItems = document.querySelector('.cart__items');
const sectionItems = document.querySelector('.items');
const btnRemoveItems = document.querySelector('.empty-cart');
// const totalValues = document.querySelector('.cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Essa função cria os elementos, suas classes e textos
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
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

// Funcao para criar o texto 'Carregando...'
const loading = () => {
  const loadingAPI = document.createElement('h3');
  loadingAPI.className = 'loading';
  loadingAPI.innerText = 'carregando...';
  sectionItems.appendChild(loadingAPI);
};

// Adiciona a lista de produtos
const searchProducts = async (products) => {
  loading();
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
  const load = document.querySelector('.loading');
  load.remove();
};

// Botão para limpar carrinho
btnRemoveItems.addEventListener('click', () => {
  shopCartItems.innerHTML = '';
  localStorage.clear();
});

// const createSpanValue = (param) => {
//   const span = document.createElement('span');
//   span.className = 'total-price';
//   span.innerText = 'O valor total estará aqui!';
//   totalValues.appendChild(span);

//   return span;
// };

window.onload = () => {
  searchProducts('computador');
  createSpanValue();
};
