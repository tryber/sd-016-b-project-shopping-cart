const cartItems = document.querySelector('.cart__items');

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

function createProductItemElement({
  sku,
  name,
  image,
}) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
  cartItems.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({
  sku,
  name,
  salePrice,
}) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

  async function productCartByID(event) {
    const productID = event.target.parentElement.firstChild.innerText;
    const fetchID = await fetchItem(productID);
    const cartObject = {
      sku: productID,
      name: fetchID.title,
      salePrice: fetchID.price,
    };
    cartItems.appendChild(createCartItemElement(cartObject));
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
  const buttonToCart = document.querySelectorAll('.item__add');
  buttonToCart.forEach((button) => {
    button.addEventListener('click', productCartByID);
  });
}
const emptyButton = document.querySelector('.empty-cart');
emptyButton.addEventListener('click', () => {
  cartItems.innerHTML = '';
});

const loading = async () => {
  const loadingParagraph = document.createElement('p');
  loadingParagraph.innerText = 'carregando...';
  loadingParagraph.className = 'loading';
  const items = document.querySelector('.items');
  items.appendChild(loadingParagraph);
  await searchProducts('computador');
  items.removeChild(loadingParagraph);
};
loading();

const loadCart = () => {
  cartItems.innerHTML = getSavedCartItems();
  const cartItem = document.querySelectorAll('.cart__item');
  cartItem.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

window.onload = () => {
  searchProducts('computador');
  loadCart();
};