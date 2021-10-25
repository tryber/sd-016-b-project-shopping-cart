const productsCarts = document.querySelector('.cart__items');
let atualPrice;

const unstructureList = async (url) => {
  const result = await fetchProducts(url);
  const data = await result.results;
  const response = await data.map((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    return { sku, name, image };
  });
  return response;
};

const unstructureItem = async (idProduct) => {
  const result = await fetchItem(idProduct);
  const { id: sku, title: name, price: salePrice } = await result;
  const response = await { sku, name, salePrice };
  return response;
};

const createSectionPriceCart = (priceSalve) => {
  const sectionCart = document.querySelector('.cart');
  const createDiv = document.createElement('div');
  const createSpan = document.createElement('Span');
  const createSpan2 = document.createElement('Span');
  createSpan2.className = 'total-price';
  createSpan.innerText = 'Valor Total: $ ';
  createSpan2.innerText = priceSalve; 
  createDiv.appendChild(createSpan);
  createDiv.appendChild(createSpan2);
  sectionCart.appendChild(createDiv);
};

const updatePricePlus = (itemPrice) => {
/*   const atualPrice = document.querySelector('.total-price').lastChild; */
  if (atualPrice.innerText === '') {
    atualPrice.innerText = itemPrice;
  } else {
    atualPrice.innerText = parseFloat(atualPrice.innerText) + itemPrice;
  }
};

const updatePriceLess = async (itemPrice) => {
/*   const atualPrice = await document.querySelector('.total-price').lastChild; */
  atualPrice.innerText = await parseFloat(atualPrice.innerText) - itemPrice;
  return localStorage.setItem('priceSalve', atualPrice.innerText);
};

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

const cartItemClickListener = async (event) => {
  const { salePrice } = await unstructureItem(event.target.id);
  event.target.remove();
  saveCartItems(productsCarts.innerHTML);
  return updatePriceLess(salePrice);
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadingMsg = () => {
  const createMsg = document.createElement('h3');
  createMsg.innerText = 'Carregando...';
  createMsg.classList = 'loading';
  const sectionItems = document.querySelector('.items');
  sectionItems.appendChild(createMsg);
};

const createNavigation = () => {
  loadingMsg();
  const itens = unstructureList('computador');
  const productList = document.querySelector('.items');
  itens.then((item) => {
    item.forEach((element) => {
    const { sku, name, image } = element;
    productList.appendChild(createProductItemElement({ sku, name, image }));
  });
  document.querySelector('.loading').remove();
});
};

const addItemCart = async (event) => {
  const { sku, name, salePrice } = await unstructureItem(event);
/*   const atualPrice = document.querySelector('.total-price').lastChild; */
  productsCarts.appendChild(createCartItemElement({ sku, name, salePrice }));
  updatePricePlus(salePrice);
  saveCartItems(productsCarts.innerHTML);
  localStorage.setItem('priceSalve', atualPrice.innerText);
};

createNavigation();

const addListenerStorage = () => {
  const lisCart = document.querySelectorAll('.cart__item');
  for (let i = 0; i < lisCart.length; i += 1) {
    lisCart[i].addEventListener('click', cartItemClickListener);
  }
};

const clearCart = () => {
  productsCarts.innerText = '';
  localStorage.setItem('priceSalve', 0);
  localStorage.setItem('cartItems', '');
  atualPrice.innerText = 0;
};

window.onload = () => {
  productsCarts.innerHTML = getSavedCartItems();
  
  createSectionPriceCart(localStorage.getItem('priceSalve'));

  atualPrice = document.querySelector('.total-price');

  addListenerStorage();

  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      return addItemCart(event.target.parentNode.firstChild.innerText);
    }
  });

  document.querySelector('.empty-cart').addEventListener('click', clearCart);
};
