
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const input = document.querySelector('.input_search');
const form = document.querySelector('.form');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const type1 = document.querySelector('.type1')
const type2 = document.querySelector('.type2')

let searchPokemon = 1
let loading = false;


const fetchPokemon = async (pokemon) => {
    if (loading) {
        return null;
    }

    loading = true;

    try {
        const APIResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );

        if (APIResponse.status === 200) {
            const data = await APIResponse.json();
            return data;
        }

        return null;
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
        return null;
    } finally {
        loading = false;
    }
};

const renderPokemon = async (pokemon) => {
    if (loading) {
        return;
    }

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = '';
    type1.value = '';
    type2.value = '';
    const data = await fetchPokemon(pokemon);

    if (data) {
        
        type1.value = data.types[0].type.name;
        if(data.types.length > 1){
            type2.value = data.types[1].type.name;
        }
        
        searchPokemon = data.id;
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.style.display = 'block';
        pokemonImage.src =
            data.sprites.other.home.front_default ||
            data.sprites.front_default;

        input.value = '';
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase().trim());
});

buttonPrev.addEventListener('click', () => {
   if(searchPokemon>1){
    searchPokemon -=1;
   renderPokemon(searchPokemon);
   }
});

buttonNext.addEventListener('click', () => {
   searchPokemon +=1;
   renderPokemon(searchPokemon);
});

renderPokemon('1');