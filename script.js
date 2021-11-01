const cartItems = document.querySelector('.cart__items');
const clearCart = document.querySelector('.empty-cart');
const loader = document.querySelector('.loading');

function loaderOff() {
  loader.innerHTML = '';
}

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

// returns product ID
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

// clear cart button
function clearCartBtn() {
  cartItems.innerHTML = '';
}

// clear cart event listener
function cartBtnEventListener() {
  clearCart.addEventListener('click', clearCartBtn);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// requisito 2 - adds to cart
const addProductCart = async (event) => {
  const productId = getSkuFromProductItem(event.target.parentNode);
  const fetchProduct = await fetchItem(productId);
  const cart = createCartItemElement(fetchProduct);
  cartItems.appendChild(cart);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const cartBtn = section
  .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  cartBtn.addEventListener('click', addProductCart);
  return section;
}

// requisito 1 - funcao faz fetch da list de produtos a partir de um parametro query e leva ela formatada para o corpo do site

async function searchProducts(query) {
 const fetchedProducts = await fetchProducts(query);
 const productSection = document.querySelector('.items');
 fetchedProducts.results.forEach((product) => {
   const productData = {
     sku: product.id,
     name: product.title,
     image: product.thumbnail,
   };
   const productItem = createProductItemElement(productData);
   productSection.appendChild(productItem);
 });
 loaderOff();
}

window.onload = () => { searchProducts('computador'); cartBtnEventListener(); };