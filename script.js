// ------------------------------------------------
// ----------------- C A R T ----------------------
// ------------------------------------------------

const cartList = document.querySelector('.cart__items');

function cartItemClickListener() {
  // coloque seu código aqui
  // OBRIGADO Gian (mentoria)

  cartList.addEventListener('click', (event) => {
    event.target.remove();
    saveCartItems(cartList.innerHTML);
  });
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartProducts(event) {
  const itemID = getSkuFromProductItem(event.target.parentNode);
  const item = await fetchItem(itemID);
  // console.log(item); OBRIGADO TALES DA METORIA

  const itemObject = {
    sku: item.id,
    name: item.title,
    image: item.thumbnail,
    salePrice: item.price,
  };
  
  cartList.appendChild(createCartItemElement(itemObject));
  saveCartItems(cartList.innerHTML);
}

const emptCart = document.querySelector('.empty-cart');

const clear = () => {
  emptCart.addEventListener('click', () => {
    cartList.remove();
    // cartList.innerHTML = '';
    saveCartItems(cartList.innerHTML = '');
  });
};

// ------------------------------------------------
// ----------------- S H O P ----------------------
// ------------------------------------------------

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function loadingMensage() {
  const body = document.querySelector('body');
  body.appendChild(createCustomElement('div', 'loading', 'carregando...'));
}

function removeLoadingMessage() {
  document.querySelector('.loading').remove();  
}

function createProductItemElement({ image, sku, name, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', salePrice));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', cartProducts);
  
  return section;
}

async function searchProducts(product) {
  loadingMensage();
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
      salePrice: item.price,
    };
    
    sectionItems.appendChild(createProductItemElement(itemObject));
  });
  removeLoadingMessage();
}

const loadingSite = async () => {
  const load = await getSavedCartItems();
  cartList.innerHTML = load;

  cartItemClickListener();
};

clear();

window.onload = () => {
  searchProducts('computador');
  loadingSite();
};
