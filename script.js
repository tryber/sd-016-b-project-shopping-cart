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

const imgCartIten = (imgSrc) => {
  img = document.createElement('img');
  img.className = 'item__image_cart';
  img.src = imgSrc;
  return img;
};

const $cartItens = document.querySelector('.cart__items');
$cartItens.addEventListener('click', (event) => {
  const $item = event.target;
  if ($item.tagName === 'LI') { $item.remove(); return saveCartItems(); }
  if ($item.tagName === 'P') { $item.parentNode.remove(); return saveCartItems(); }
  if ($item.tagName === 'IMG') { $item.parentNode.remove(); return saveCartItems(); }
  if ($item.tagName === 'path') {
    $item.parentNode.previousSibling.parentNode.parentNode.remove();
    return saveCartItems();
  }
});

function createCartItemElement({ id: sku, title: name, price: pice, thumbnail: imG }) {
  const $li = document.createElement('li');
  const $xX = '<i class="fas fa-times"></i>';
  $li.className = 'cart__item';
  $li.setAttribute('sku', `${sku}`);
  $li.innerHTML = `<p class="item_desc">SKU: ${sku} | NAME: ${name} | PRICE: $${pice}${$xX}`;
  $li.appendChild(imgCartIten(imG));
  return $li;
}

async function getSkuFromProductItem(event) {
  const $rest = await fetchItem(event.target.parentNode.querySelector('span.item__sku').innerText);
  document.querySelector('ol.cart__items').appendChild(createCartItemElement($rest));
  saveCartItems();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price: pice }) {
  const $section = document.createElement('section');
  $section.className = 'item';
  $section.addEventListener('click', getSkuFromProductItem);
  $section.appendChild(createCustomElement('span', 'item__sku', sku));
  $section.appendChild(createCustomElement('span', 'item__title', name));
  $section.appendChild(createProductImageElement(image));
  $section.appendChild(createCustomElement('span', 'item__price', `R$: ${pice}`));
  $section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return $section;
}

const $btnClrCart = document.querySelector('.empty-cart');
$btnClrCart.addEventListener('click', () => {
  document.querySelector('ol.cart__items').innerHTML = '';
  return saveCartItems();
});

const loadStart = () => {
  document.querySelector('.items').style.display = 'none';
  const $load = document.querySelector('.loading');
  $load.innerText = 'carregando...';
};

const loadStop = () => {
  document.querySelector('.items').style.display = 'flex';
  const $loadText = document.querySelector('#loadtext');
  $loadText.innerHTML = '';
};

window.onload = async () => {
  loadStart();
  await fetchProducts('computador').then((inventory) => {
    inventory.results.forEach((product) => document.querySelector('.items')
      .appendChild(createProductItemElement(product)));
  }); loadStop();
  getSavedCartItems();
};