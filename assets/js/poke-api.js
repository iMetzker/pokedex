
// POKEMON LIST

class Pokemon {
    number;
    name;
    type;
    photo;
    stats = [];
    types = [];
}

const pokeApi = {}

function converPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types
    .map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 30) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeAPI.getPokemonByName = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeAPIDetailToPokemon)
}

// Pokemon More Info

function convertPokeApiDetailToPokemonInfo(pokeDetail) {

    
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

   
    pokeDetail.stats.forEach(stats => {

        const itemName = stats.stat.name;
        const itemValue = stats.base_stat;

        pokemon.stats[itemName] = itemValue;
        pokemon.totalStats += itemValue;
        
    });

    return pokemon
}


pokeApi.getPokemonInfo = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonInfo)      
        
}
