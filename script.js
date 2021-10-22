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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  
  li.className = 'cart__item';
  const classCartItems = document.querySelector('.cart__items');
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  classCartItems.appendChild(li);  
}

const buscarProduto = async (produto) => {
  const arrayItens = await fetchProducts(produto);
  const sessao = document.querySelector('.items');
  arrayItens.results.forEach((item => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObj);
    sessao.appendChild(productItem);
  }));
};

const addToCart = () => {
  const buttons = document.querySelector('.items');
  buttons.addEventListener('click', (event) => {
    if (event.target.className === 'item__add') { 
    const idByParent = event.target.parentNode.querySelectorAll('.item__sku').innerText;
    fetchItem(idByParent).then((data) => createCartItemElement(data));
    }
  });
};

window.onload = () => { 
  buscarProduto('computador');
  addToCart();
};
