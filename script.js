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

function createProductItemElement({ sku, name, image }) {
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

async function clickCartItem(event) {
  const id = event.target.parentElement.firstChild.innerText;
  const objectId = await fetchItem(id);
  const cartItemsElements = {
    sku: id,
    name: objectId.title,
    salePrice: objectId.price,
  };
  cartItems.appendChild(createCartItemElement(cartItemsElements));
}

async function searchProducts(product) {
  const items = document.querySelector('.items');
  const searchItems = await fetchProducts(product);
  searchItems.results.forEach((item) => { // Percorre o array retornado de 'fetchProducts'
    const returnObject = { // e retorna um objeto no padrão desejado.
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    const productItem = createProductItemElement(returnObject);
    items.appendChild(productItem);
  });
  
  const addToCartButtons = document.querySelectorAll('.item__add');
  addToCartButtons.forEach((button) => { // Adiciona um event listener para cada botão de "adicionar o carrinho".
    button.addEventListener('click', clickCartItem);
});
}

window.onload = () => {
  searchProducts('computador');
};
