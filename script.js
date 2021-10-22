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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.remove();
}

// REVIEW - Cria o elemento que será adicionado ao carrinho, adiciona um eventListener de click no item. Após isso, retorna o appendChild do criado.

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  const cartItems = document.querySelector('.cart__items');

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => cartItemClickListener(li));

  return cartItems.appendChild(li);
}

// REVIEW - Faz uma requisição a fetchProduts passando o parâmetro "computador". Percorre o array retornado, chamando a função createProductItemElement, passando como parâmetro cada item do array para solicitar a montagem da página.

const callAppendSection = async () => {
  const arrItems = await fetchProducts('computador');

  arrItems.results.forEach((item) => {
    createProductItemElement(item);
  });
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

// REVIEW - Inicia as funções criadas.

window.onload = () => {
  callAppendSection();
  addCartItems();
};
