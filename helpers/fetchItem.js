const fetchItem = (item) => fetch(`https://api.mercadolibre.com/items/${item}`)
  .then((resposta) => resposta.json());

if (typeof module !== 'undefined');