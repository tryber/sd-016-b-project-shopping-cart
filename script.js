const carrinho = document.querySelector('ol.cart__items');

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

const imagemItem = (imagem) => {
  img = document.createElement('img');
  img.className = 'item__image_cart';
  img.src = imagem;
  return img;
};

const totalCarrinho = () => {
  const valorItem = [];
  const total = document.querySelector('.total-price');
  const itens = document.querySelectorAll('.cart__item');
  itens.forEach((item) => valorItem.push(item.innerText.split('$')[1]));
  valorItem.map((item) => Number(item));
  const totalAtualizado = valorItem.reduce((acc, crv) => Number(acc) + Number(crv), 0);
  total.innerText = `${totalAtualizado}`;
};

const atualizar = () => {
  const $data = document.querySelector('.cart__items');
  saveCartItems($data.innerHTML);
  return totalCarrinho();
};

const $carrinho = document.querySelector('.cart__items');
$carrinho.addEventListener('click', (event) => {
  const $item = event.target;
  if ($item.tagName === 'LI') { $item.remove(); return atualizar(); }
  if ($item.tagName === 'P') { $item.parentNode.remove(); return atualizar(); }
  if ($item.tagName === 'IMG') { $item.parentNode.remove(); return atualizar(); }
  if ($item.tagName === 'path') {
    $item.parentNode.previousSibling.parentNode.parentNode.remove();
    return atualizar();
  }
});

const createCartItemElement = ({ id: sku, title: name, price: pice, thumbnail: imG }) => {
  const $li = document.createElement('li');
  const $xX = '<i class="fas fa-times"></i>';
  $li.className = 'cart__item';
  $li.setAttribute('sku', `${sku}`);
  $li.innerHTML = `<p class="item_desc">SKU: ${sku} | NAME: ${name} | PRICE: $${pice}${$xX}`;
  $li.appendChild(imagemItem(imG));

  return $li;
};
  
async function getSkuFromProductItem(event) {
  const $resultado = await fetchItem(event.target.parentNode
  .querySelector('span.item__sku').innerText);
  carrinho.appendChild(createCartItemElement($resultado));
  atualizar();
}

const createProductItemElement = ({ id: sku, title: name, thumbnail: image, price: pice }) => {
  const $section = document.createElement('section');
  $section.className = 'item';
  $section.addEventListener('click', getSkuFromProductItem);
  $section.appendChild(createCustomElement('span', 'item__sku', sku));
  $section.appendChild(createCustomElement('span', 'item__title', name));
  $section.appendChild(createProductImageElement(image));
  $section.appendChild(createCustomElement('span', 'item__price', `R$: ${pice}`));
  $section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return $section;
};

const $btnClrCart = document.querySelector('.empty-cart');
$btnClrCart.addEventListener('click', () => {
  carrinho.innerHTML = '';
  return atualizar();
});

const iniciando = () => {
  document.querySelector('.items').innerHTML = '';
  document.querySelector('.items').style.display = 'none';
  const $load = document.querySelector('.loading');
  $load.innerText = 'carregando...';
};

const parando = () => {
  document.querySelector('.items').style.display = 'flex';
  const $loadText = document.querySelector('#loadtext');
  $loadText.innerHTML = '';
  document.querySelector('.load').style.display = 'none';
};

const sharload = () => {
  document.querySelector('.items').innerHTML = '';
  document.querySelector('.items').style.display = 'none';
  document.querySelector('.load').style.display = 'flex';
};

const reload = () => {
  carrinho.innerHTML = getSavedCartItems();
};

const busca = async (item = 'computador') => {
  sharload();
  await fetchProducts(item).then((inventory) => {
    inventory.results.forEach((product) => document.querySelector('.items')
      .appendChild(createProductItemElement(product)));
  }); parando();
  reload(); totalCartIten();
};

const toEnter = (e) => {
  const { value } = e.target;
  const key = e.keyCode;
  if (key === 13) busca(value);
};

const $busca = document.querySelector('.searchI');
$busca.addEventListener('keydown', toEnter);
$busca.addEventListener('blur', () => {
  busca($busca.value);
});

window.onload = () => {
  iniciando();
  busca();
};
