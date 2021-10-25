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

// Requisito 3
function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Requisito 1
async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    // const { id: sku, title: name, thumbnail: image } = item;
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

// Requisito 2
// pegar querySelector('.item.add) e colocar addEventListener, com click e chamar a função de colocar no carrinho

async function addItem(id) {
  const newFoundItem = await fetchItem(id);
  const cartItem = document.querySelector('.cart__items');
  const product = {
    sku: newFoundItem.id,
    name: newFoundItem.title,
    salePrice: newFoundItem.price,
  };

  const productItem = createCartItemElement(product);
  cartItem.appendChild(productItem);
}

function getSku() {
  const items = document.querySelector('.items');
  items.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      const button = event.target;
      const sku = button.parentNode.firstChild.innerText;

      addItem(sku);
    }
  });
}

window.onload = () => {
  searchProducts('computador');
  // addItem('MLB1341706310');
  getSku();
};
