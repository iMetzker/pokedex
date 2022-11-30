
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');



const maxRecords = 151
const limit = 30
let offset = 0


function addZeros(numberPokemon, numberZeros) {
    return String(numberPokemon).padStart(numberZeros, '0');
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => pokemonList.innerHTML += pokemons.map((pokemon) =>
            `
                <li class="pokemon ${pokemon.type}">

                <button type="button" class ="${pokemon.type}" id="infoPokemon" onclick='showDetails("${pokemon.name}")'>
                <img src="./assets/img/pokeInfo.png" alt="botão para mais informações">
                </button>

                <span class="number">#${addZeros(pokemon.number, 3)}</span>
                    <div class="detail">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                </li>
        `
        ).join(''))
}



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qdtRecordNextPage = offset + limit

    if (qdtRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)


        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {

        loadPokemonItens(offset, limit)
    }
})

loadPokemonItens(offset, limit)

// Modal


    