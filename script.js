const sectionItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const updateTotalPrice = () => {
  let result = 0;
  for (let i = 0; i < cartItems.children.length; i += 1) {
    const child = cartItems.children[i];
    const price = Number(child.getAttribute('price'));
    if (price) {
      result += price;
    }
  }
  totalPrice.innerHTML = result;
};
  
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
  updateTotalPrice();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.setAttribute('price', salePrice);
  return li;
}

const loadProductsPage = () => {
   fetchProducts('computador')
   .then((data) => data.results)
   .then((products) => {
    products.forEach((product) => {
    const createSectionItems = createProductItemElement(product);
    sectionItems.appendChild(createSectionItems); 
    }); 
  });
};


const LoadProductCart = (id) => {
  fetchItem(id).then((item) => {
    const cartLi = createCartItemElement(item);
    cartItems.appendChild(cartLi);
    saveCartItems(cartItems.innerHTML);
    updateTotalPrice();
  });
};

const addProductCart = (event) => {
  if (event.target.classList.contains('item__add')) {
    const id = event.target.parentNode.firstChild.innerText;
    LoadProductCart(id);
  }
};

const loadLocalStorage = () => {
  const save = getSavedCartItems();
  if (save) {
    cartItems.innerHTML = save;
    updateTotalPrice();
  }
};

window.onload = () => { 
  loadProductsPage();
  sectionItems.addEventListener('click', addProductCart);
  cartItems.addEventListener('click', cartItemClickListener);
  loadLocalStorage();
};
