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
  const item = event.target;
  item.parentNode.removeChild(item);
  return saveCartItems();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createProductsObjects = async () => {
  const products = await fetchProducts('computador');
  const list = products.results
    .map(({ id, title, thumbnail, price }) => {
      const productObject = {
        sku: id,
        name: title,
        image: thumbnail,
        salePrice: price,
      };
      return productObject;
    });
  return list;
};

const createProductObjectById = async (id) => {
  const product = await fetchItem(id);
  return {
    sku: id,
    name: product.title,
    image: product.thumbnail,
    salePrice: product.price,
  };
};

const fillItemList = async () => {
  const list = await createProductsObjects();
  const itemsSection = document.querySelector('.items');
  list.forEach((product) => {
    const ItemElement = createProductItemElement(product);
    itemsSection.appendChild(ItemElement);
  });
  return itemsSection;
};

const addProductsToCart = () => {
  const shoppingCartList = document.querySelector('.cart__items');
  const buttonsList = document.querySelectorAll('.item__add');
  buttonsList.forEach((button) => button.addEventListener('click', async () => {
      const id = button.previousSibling.previousSibling.previousSibling.innerText;
      const product = await createProductObjectById(id);
      shoppingCartList.appendChild(createCartItemElement(product));
      return saveCartItems();
  }));
};

window.onload = async () => {
  await fillItemList();
  addProductsToCart();
};
