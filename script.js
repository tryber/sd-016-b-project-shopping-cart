const listCartItens = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

function totalPriceCartItems() {
  let count = 0;
  for (let index = 0; index < listCartItens.children.length; index += 1) {
    const childrenList = listCartItens.children[index];
    count += Number(childrenList.getAttribute('price'));
  }
  totalPrice.innerHTML = count;
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

function cartItemClickListener(event) {
  const clickElementItem = event.target;
  clickElementItem.remove();
  saveCartItems(listCartItens.innerHTML);
  totalPriceCartItems();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.setAttribute('price', salePrice);
  return li;
}

function addProductToCart(id) {
  fetchItem(id)
    .then((products) => {
      const elementCartItems = document.querySelector('.cart__items');
      const productImCart = createCartItemElement(products);
      elementCartItems.appendChild(productImCart);
      saveCartItems(listCartItens.innerHTML);
      totalPriceCartItems();
    });
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);

  button.addEventListener('click', () => {
    addProductToCart(sku);
  });

  return section;
}

function onloadPage() {
  fetchProducts('computador')
    .then((products) => {
      const elementItems = document.querySelector('.items');
      products.forEach((product) => {
        const createItems = createProductItemElement(product);  
        elementItems.appendChild(createItems); 
      });
    });
}

function removeCartItems() {
  listCartItens.innerHTML = '';
  saveCartItems(listCartItens.innerHTML);
  totalPriceCartItems();
}

window.onload = () => {
  onloadPage();
  listCartItens.innerHTML = getSavedCartItems();
  listCartItens.addEventListener('click', cartItemClickListener);
  totalPriceCartItems();
  const removeButton = document.querySelector('.empty-cart');
  removeButton.addEventListener('click', removeCartItems);
};
