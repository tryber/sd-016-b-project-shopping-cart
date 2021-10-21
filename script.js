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

const productsList = async () => {
  const products = await fetchProducts('computador');
  const items = document.getElementsByClassName('items')[0];
  products.results.forEach((product) => {
    const display = createProductItemElement(product);
    items.appendChild(display);
  });
};

// function getId(element) {
//   const innerId = element.target.parentNode.firstChild.innerText;
//   return innerId;
// }

// const addItemCartElement = async (id) => {
//   const item = await fetchItem(id);
//   const addProduct = createCartItemElement(item);
//   document.getElementsByClassName('cart__items')[0].appendChild(addProduct);
// };

// window.onload = () => {
//   productsList();
//   document.addEventListener('click', function (element) {
//     if (element.target && element.target.classList.contains('item__add')) {
//       addItemCartElement(getId(element));
//     }
//   });
// };

function getId(e) {
  const innerTxtId = e.target.parentNode.firstChild.innerText;
  return innerTxtId;
}

const addItemCartElement = async (id) => {
  const prod = await fetchItem(id);
  const prodAdded = createCartItemElement(prod);
  document.getElementsByClassName('cart__items')[0].appendChild(prodAdded);
};

// código do https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript event delegation.

window.onload = () => {
  productsArray();
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('item__add')) {
      addItemCartElement(getId(e));
    }
  });
};
