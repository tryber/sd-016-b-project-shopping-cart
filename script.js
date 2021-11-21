const productList = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.cart__total-price');

const storage = {
  strings: { total: 'cart__total-price' },
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

/** Atualiza o banco de dados local; */
const updateLocalStorage = (item, value) => {
  switch (item) {
    case 'total':
      localStorage.setItem(storage.strings.total, value);
      break;
    default:
      return 0;
  }
};

const cartItemClickListener = async ({ target }) => {
  const price = parseFloat(
    target.parentNode.querySelector('.cart_item-price').innerHTML,
  );
  if (parseFloat(totalPrice.innerHTML) > 0) {
    totalPrice.innerHTML = (parseFloat(totalPrice.innerHTML) - price).toFixed(2);
  }
  cartList.removeChild(target);
  updateLocalStorage('total', totalPrice.innerHTML);
  saveCartItems(cartList.innerHTML);
};

/** Carrega o banco de dados local; */
const loadLocalStorage = () => {
  if (localStorage.getItem('cartItems')) {
    cartList.innerHTML = getSavedCartItems();
    if (localStorage.getItem(storage.strings.total) < 0) {
      updateLocalStorage('total', 0);
    }
    totalPrice.innerHTML = localStorage.getItem(storage.strings.total);
    document.querySelectorAll('.cart__items li')
      .forEach((item) => item.addEventListener('click', cartItemClickListener));
  }
};

/** 
 * Desenvolve o elemento e adiciona ao carrinho de compras;
 * Refatorado para melhorar o desempenho e facilitar a implementação de demais
 * funcionalidades ao sistema de carrinhode compras;
 * 
 * Priridade máxima;
 */
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  // li.insertAdjacentHTML('beforeend', `
  //   <span class="cart_item-id">${sku}</span>
  //   <span class="cart_item-name">${name}</span>
  //   <span class="cart_item-price">${salePrice}</span>
  // `);
  li.insertAdjacentHTML('beforeend', `
    SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}
    <span class="cart_item-price" style="display: none">${salePrice}</span>
  `);
  li.addEventListener('click', (event) => {
    event.stopPropagation();
    cartItemClickListener(event);
  });
  return li;
};

/** Desenvolve o loading; */
const loading = () => {
  const element = document.querySelector('.loading');
  if (element.innerHTML === '') {
    element.innerHTML = 'carregando';
  } else {
    element.innerHTML = '';
  }
};

/** Adiciona o produto no carrinho de compras; */
const addInShoppingCart = async ({ target }) => {
  const elementId = getSkuFromProductItem(target.parentNode);
  const { id, title, price } = await fetchItem(elementId);
  cartList.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  totalPrice.innerHTML = (parseFloat(totalPrice.innerHTML) + price).toFixed(2);
  updateLocalStorage('total', totalPrice.innerHTML);
  saveCartItems(cartList.innerHTML);
};

const clearShoppingCart = () => {
  if (localStorage.getItem('cartItems')) {
    cartList.innerHTML = null;
    totalPrice.innerHTML = '0';
    localStorage.clear();
  }
};

/** Desenvolve a lista de produtos; */
const assemblyListProducts = async (query) => {
  loading();
  const { results } = await fetchProducts(query);
  loading();

  results.forEach(({ id, title, thumbnail }) => {
    productList.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

window.onload = async () => {
  await assemblyListProducts('computador');
  loadLocalStorage();

  document.querySelectorAll('.item__add').forEach((item) => {
    item.addEventListener('click', (event) => { 
      // Remove a propagação do javascript; Fix future bugs;
      event.stopPropagation(); 
      addInShoppingCart(event);
    });
  });

  document.querySelector('.empty-cart')
    .addEventListener('click', clearShoppingCart);
};