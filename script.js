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
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const buscarProduto = async (produto) => {
  const arrayItens = await fetchProducts(produto);
  const sessao = document.querySelector('.items');
  arrayItens.results.forEach((item) => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObj);
    sessao.appendChild(productItem);
  });
};

function capturarId(id) {
  const inner = id.target.parentNode.firstChild.innerText;
  return inner;
}

const adicionarItemCarrinho = async (id) => {
  const produto = await fetchItem(id);
  const adicionarProduto = createCartItemElement(produto);
  document.getElementsByClassName('cart__items')[0].appendChild(adicionarProduto);
};

window.onload = () => { 
  buscarProduto('computador');
  document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('item__add')){
      adicionarItemCarrinho(capturarId(event));
    }
  });     
};
