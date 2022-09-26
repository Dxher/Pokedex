
const pokemonCount = 151;
const search = document.getElementById("search");
const form = document.getElementById("form");
var pokedex = {}; //{1: {"name" : "bulbasaur", "img" : url, "type" : ["grass", "poison"], "description" : "..."}}
let pokemonchar = [];

//initial loading of all the pokemon
window.onload = async function(){
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);

        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");

        pokemon.addEventListener("click", updatePokemon);

        document.getElementById("pokemon-list").append(pokemon);
       
    } 

}

//this allows for the pokedex to appear
function show() {
    document.getElementById("pokebox").classList.toggle("active");
}    

// gets the pokemon name, image, type and description from the api by taking the pokemon's number as a argument
async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImage = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDescription = await res.json();

    pokemonDescription = pokemonDescription["flavor_text_entries"][9]["flavor_text"];

    pokedex[num] = {"name":pokemonName, "img":pokemonImage, "types":pokemonType, "desc":pokemonDescription}
}

// Updates the pokemon info displayed on the left of the pokedex
function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while(typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for (let i=0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); // adds background color and font color
        typesDiv.append(type);
    }

    //update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}

//if its not the pokemon name or number this will delete the list of pokemon on pokedex
function searchPoke() {
    var x = document.forms["pokename"]["search"].value;

    for (let i = 1; i <= pokemonCount; i++) {
        if (i!=x && pokedex[i].name!=x )
            document.getElementById(i).remove();
    }
}

//reset button: brings the list back after having done a search
function reset2() {
    
    document.getElementById("pokemon-list").replaceChildren();
    for (let i = 1; i <= pokemonCount; i++) {
        
    
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");

        pokemon.addEventListener("click", updatePokemon);

        document.getElementById("pokemon-list").append(pokemon);
       
    } 
}

/* attempted to add a filter while seaching so that as you search you only see the pokemons with those letters
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = pokeCharacters.filter((pokemon) => {
        return (
            pokemonName.toLowerCase().includes(searchString) ||
        );
    });
    displayCharacters(filteredCharacters);
});*/
