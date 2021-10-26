const clearButtonCart = document.querySelector('empty-cart');
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
  // código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// realizado com auxílio do vídeo do professor Bernardo Salgueiro, explicando como fazer o requisito 1.
  async function productList(products) {
    const searchData = await fetchProducts(products);
    const sectionItems = document.querySelector('.items');
    searchData.results.forEach((item) => {
      const itemObj = {
        sku: item.id, 
        name: item.title, 
        image: item.thumbnail, 
      };

      const productItem = createProductItemElement(itemObj);
      sectionItems.appendChild(productItem);
    });
}

  function setId(event) {
    const setIdTxt = event.target.parentNode.firstChild.innerText;
    return setIdTxt;
  }

  const addItemCart = async (id) => {
    const item = await fetchItem(id);
    const addProduct = createCartItemElement(item);
    document.getElementsByClassName('cart__items')[0].appendChild(addProduct);
};

// código event delegation https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
window.onload = () => {
  productList('computador');
  document.addEventListener('click', function (element) {
    if (element.target && element.target.classList.contains('item__add')) {
      addItemCart(setId(element));
    }
    cartItemClickListener();
  });
};