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

// REQUISITO 1 -funcao que adiciona os items
function getProduct(product) {
  const itemsSection = document.querySelector('.items');

  fetchProducts(product)
    .then((response) => response.results.map((element) => {
      const { id: sku, title: name, thumbnail: image } = element;

      return {
        sku,
        name,
        image,
      };
    }))
    .then((data) => data.forEach((element) => {
      const item = createProductItemElement(element);
      itemsSection.appendChild(item);
    }));
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// function cartItemClickListener(event) {
//   // coloque seu código aqui
// }

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// REQUISITO 2 - funcao que adiciona os items ao carrinho
async function addItemToCart(event) {
  const cartItems = document.querySelector('.cart__items');
  if (event.target.classList.contains('item__add')) {
    const itemID = event.target.parentElement.firstChild.innerText;
    const product = await fetchItem(itemID);
    const productInfo = {
      sku: itemID,
      name: product.title,
      salePrice: product.price,
    };
    const li = createCartItemElement(productInfo);
    cartItems.appendChild(li);
  }
}

function getCartProducts() {
  return document.addEventListener('click', addItemToCart);
}

window.onload = () => {
  getProduct('computador');
  getCartProducts();
 };
