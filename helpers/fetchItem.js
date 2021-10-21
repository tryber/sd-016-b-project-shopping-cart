const baseUrl = "https://api.mercadolibre.com/items/"

const fetchItem = async (itemId) => {
  const endPoint = itemId
  const url = `${baseUrl}${endPoint}`

   const result = await fetch(url)
    .then((response)=> response.json())
      .then((data)=>data)
        .catch(()=>'erro')

  return result
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
