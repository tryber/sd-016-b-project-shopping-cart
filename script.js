let sumCartProducts = 0;

// REVIEW - Função que cria um elemento de imagem quando invocada

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// REVIEW - Função que cria um elemento com classe defenida e o texto da tag, quando invocada

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;

  return e;
}

// REVIEW - Foram alterados os parâmetros da função para que se enquadrem ao objeto que será recebido por parâmetro. Adiciona a section criada dos produtos na section items.

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const sectionFather = document.querySelector('.items');

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  sectionFather.appendChild(section);

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const cartList = document.querySelector('.cart__items');

// REVIEW - Função que realiza a busca do seletor no HTML, e faz a alteração do innerText de spanSumCartItems para o valor que foi alterado nas funções de soma e subtração.

const changeValueCart = () => {
  const spanSumCartItems = document.querySelector('.total-price');
  spanSumCartItems.innerText = sumCartProducts;
};

// REVIEW - Função que realiza o incremento da variável sumCartProducts e invoca a função changeValueCart.

const sumFunction = (sum) => {
  sumCartProducts += sum;

  changeValueCart();
};

// REVIEW - Função que realiza o decremento da variável sumCartProducts e invoca a função changeValueCart.

const decreaseFunction = (decrease) => {
  sumCartProducts -= decrease;

  changeValueCart();
};

// REVIEW - Quando invocada, exclui o item específico do carrinho, chama a função para subtrair o valor do carrinho, e salva a lista atualizada em localStorage

const cartItemClickListener = (event, price) => {
  setTimeout(() => {
    event.remove();
    decreaseFunction(price);
    saveCartItems(cartList.innerHTML);
  }, 1);
};

// REVIEW - Cria o elemento que será adicionado ao carrinho, adiciona um eventListener de click no item que retorna ao ser clicado a função que apaga os items do carrinho. Após isso, retorna o appendChild do criado.

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  const cartItems = document.querySelector('.cart__items');

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => cartItemClickListener(li, salePrice));

  setTimeout(() => {
    saveCartItems(cartList.innerHTML);
  }, 1);
  sumFunction(salePrice);

  return cartItems.appendChild(li);
};

// REVIEW - Faz uma requisição a fetchProduts passando o parâmetro "computador". Percorre o array retornado, chamando a função createProductItemElement, passando como parâmetro cada item do array para solicitar a montagem da página.

const callAppendSection = async () => {
  const arrItems = await fetchProducts('computador');

  arrItems.results.forEach((item) => {
    createProductItemElement(item);
  });
  // deleta o carregando
};

// REVIEW - Encontra o seletor com classe .items, e adiciona um evento de click ao ser invocada. Verifica se no click, a classe invocada é um botão. Se for um botão, pega o id do elemento e chama fetchItem passando esse id como parâmetro. Com a resposta em mãos, retorna a função que cria cada elemento dentro do carrinho, passando a 'Promese' como parâmetro.

const addCartItems = () => {
  const sectionItem = document.querySelector('.items');

  sectionItem.addEventListener('click', (event) => {
    if (event.target.className === 'item__add') {
      const parentId = event.target.parentNode.querySelector('.item__sku').innerText;

      fetchItem(parentId)
        .then((response) => createCartItemElement(response));
    }
  });
};

// REVIEW - Busca os dados em getSavedCartItems(), insere como innerHTML na OL (cartList), constrói um array com as LI's (cart__item), injeta em cada uma das LI's um addEventListener, tendo como retorno a função que apaga as LI's.

const getCartFromLocalStorage = async () => {
  const cartInStorage = await getSavedCartItems();

  cartList.innerHTML = cartInStorage;

  const listSavedProducts = document.querySelectorAll('.cart__item');

  listSavedProducts.forEach((element) => {
    element.addEventListener('click', (event) => cartItemClickListener(event.target));
  });
};

// REVIEW - Inicia as funções criadas.

window.onload = () => {
  callAppendSection();
  addCartItems();
  getCartFromLocalStorage();
  cartList.innerHTML = getSavedCartItems();
};
