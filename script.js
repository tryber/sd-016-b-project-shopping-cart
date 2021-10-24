const tagOl = document.querySelector('.cart__items');
const sectionCarShopping = document.querySelector('.cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// ***********************
// QUESTÃO 03 FRONT END *
// **********************
function cartItemClickListener(event) {
   const objecto = event.target;
   objecto.remove();
   saveCartItems(tagOl.innerHTML);
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// ********************* 
// QUESTÃO 06 FRONT //  
// *******************
const buttonClearShopping = document.querySelector('.empty-cart');
buttonClearShopping.addEventListener('click', () => {
  // const tagOl = document.querySelector('.cart__items'); // tag OL
  tagOl.innerHTML = '';
  saveCartItems(tagOl.innerHTML);
  // https://qastack.com.br/programming/7667958/clearing-localstorage-in-javascript
  localStorage.clear();
});

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// *****************************************************
// COMETÁRIO DA FUNÇÃO: Não irei Utilizar essa função //
// ********************* ******************************
function getSkuFromProductItem(item) {  
   // coloque código aqui
}

 // ***************************************************** 
// CRIANDO A FUNÇÃO DE CUSTOMIZAÇÃO DE PREÇO TOTAL 
// ******************************************************
// Função cria os elementos que estarão contidos na section
// Preço Total
function createCustomPriceTotal(element, innerText, idElement) {
  const e = document.createElement(element);
  e.innerText = innerText;
  e.id = idElement;
  return e;
}

// ************************************************************
// Função que irá criar e acoplar o elemento a seção no HTML /
// **********************************************************
function createSectionPrice() {
  const sectionPriceTotal = document.createElement('section');
  sectionPriceTotal.className = 'total-price';
  sectionPriceTotal.appendChild(createCustomPriceTotal('span', 'Soma Total R$', 'labelSomatotal'));
  sectionPriceTotal.appendChild(createCustomPriceTotal('span', 'Price', 'localPrice'));
  sectionCarShopping.appendChild(sectionPriceTotal);
}

// **********************
// QUESTÃO 02 BACK END //
// **********************
async function addShoppingCartBackEnd(event) {
    try {
      const idProduto = event.target.parentNode.firstChild.innerText;
      const dataResult = await fetchItem(idProduto);
      const { id: sku, title: name, price: salePrice } = dataResult;
     // const priceProduct = salePrice;
     // sumShoppingCart(parseFloat(salePrice));
      const elementChild = createCartItemElement({ sku, name, salePrice });
      const itens = document.querySelector('.cart__items');
      itens.appendChild(elementChild);
      saveCartItems(itens.innerHTML);
   } catch (error) {
    console.log('Erro Function addShoppingCarBackEnd:', error);
  }
}

// **********************
// FRONT END //
// **********************
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAdicionar = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAdicionar.addEventListener('click', addShoppingCartBackEnd);
  section.appendChild(buttonAdicionar);

  return section;
}

// **********************
// QUESTÃO 01 BACK END //
// **********************
async function backEndCreateProductItem() {
  try {
   const { results } = await fetchProducts('computador');
    results.forEach((item, position) => {
    const { id: sku, title: name, thumbnail: image } = results[position];
    const elementChild = createProductItemElement({ sku, name, image });
    const itens = document.querySelector('.items');
    itens.appendChild(elementChild);
  });
 } catch (error) {
   console.log('Seu erro é:', error);
 }
}

// ******************************************* //
// FRONT END Busncando LocalSotorage          //
// setando na tagHtml e colocando de remoção //
// *******************************************
function load() {
  const recuperaLocalStorage = getSavedCartItems();
  tagOl.innerHTML = recuperaLocalStorage;
  tagOl.addEventListener('click', cartItemClickListener);
}
window.onload = () => {
  backEndCreateProductItem();
  load();
  createSectionPrice();
  };
