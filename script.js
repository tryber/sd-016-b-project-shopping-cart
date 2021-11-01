const cartItems = document.querySelector('.cart__items');
const btnEmptyCart = document.querySelector('.empty-cart');

btnEmptyCart.addEventListener('click', () => {
  cartItems.innerHTML = '';
  localStorage.clear();
});

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
  const listener = JSON.parse(localStorage.getItem('cartItems'));
  const listenerArr = [];
  let bool = false;
  for (let i = 0; i < listener.length; i += 1) {
    if (listener[i].includes(event.target.innerText.slice(0, 19)) && bool === false) { 
      bool = true;
    } else {
      listenerArr.push(listener[i]);
    }  
  }
  localStorage.cartItems = JSON.stringify(listenerArr);
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  saveCartItems(li);
  return li;
}

async function productOnCart(event) {
  const li = event.target.parentElement.firstChild.innerText;
  await fetchItem(li)
  .then((data) => {
    cartItems.appendChild(createCartItemElement(data));
  });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', productOnCart);

  return section;
}

async function searchProducts(product) {
  const sectionItems = document.querySelector('.items');
  const searchData = await fetchProducts(product);
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

window.onload = () => { 
  searchProducts('computador');
};