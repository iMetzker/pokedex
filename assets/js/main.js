

const url = 'https://pokeapi.co/api/v2/pokemon';


fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => console.log(jsonBody))
    .catch((error) => console.log(error))