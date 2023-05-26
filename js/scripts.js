
let pokemonRepository = (function() {
  let pokemonList = [  
  {    
    name: "Bulbasaur",    
    type: ["Grass", " Poison" ],
    height: 1.8
  },
  {
    name: "Charmander",
    type: ["Fire"],
    height: 1.2
  },
  {
    name: "Squirtle",
    type: ["Water"],
    height: 1
  }
 ];
 // allows external code to access the pokemonList //
 function getAll() {
  return pokemonList;
 }

 // this function is used to add new pokemon to list //
 // it takes a pokemon parameter which should be an object with properties 'name' 'type' 'height' //
 // it first checks if pokemon parameter has all correct keys & if all conditions are met it will push the new pokemon to the pokemonList array //
 function add(pokemon) { 
  const expectedKeys = ['name', 'type', 'height']; // keys //
  const actualKeys = Object.keys(pokemon);

  }
 // actual keys are compared with the expectedKeys array to check if pokemon object has all expected keys //
 // typeof pokemon === 'object' checks if pokemon variable is an object ensuring only objects can be added to list // 
 // expectedKeys.every(key => actualKeys.includes(key)) uses the every message on 'expected keys' to check if expectedKeys array is present in actualKeys array //

  if(typeof pokemon === 'object' && expectedKeys.every(key => actualKeys.includes(key))){
  pokemonList.push(pokemon);
  } else { // if conditions arent met display following message //
    console.error('You can only add an object to the pokemon list')
  }

  function findPokemonByName(name)//parameter//
   { // returns an array of pokemon objects that match with the 'name' parameter which represents the name of the pokemon you want to find//
     // pokemonList.filter iterates over each pokemon object //
     // uses callback function (function(pokemon) {return pokemon.name() === name(); which is envoked for each object in the pokemonList array.//
     // it takes a pokemon parameter representing each pokemon in the array. 'pokemon.name() === name()' is used to check if the 'name' property of the current pokemon is equal to the given name parameter//
     // if this comes back as true then the pokemon will be added to the filteredPokemon array.//
     // finally filteredPokemon is returned from findPokemonByName which will provide objects with the given name//
    let filteredPokemon = pokemonList.filter(function(pokemon) {
      return pokemon.name() === name();
    });
    return filteredPokemon;
  }

// the purpose of this, is to expose the given functions within pokemonRepository so that external code can access
// and use these functions while keeping pokemonList private //
 return {
  getAll: getAll,
  add: add,
  findPokemonByName: findPokemonByName
  
 };
})();

pokemonRepository.getAll().forEach(function(pokemon){
 let element = document.querySelector('pokemon-List')
 let listItem = document.createElement('li')
 let button = document.createElement('button')
 button.innerText = pokemon.name;
 button.classList.add('button-style')
 listItem.appendChild(button); // appends the button as a child to the list item 
 element.appendChild(listItem); // appends the list item as a child to the container element
});

















/*
// Iterate over each item in the pokemonList array
for (let i = 0; i<pokemonList.length; i++) 
// Check if the Pokémon's height is greater than 1.5
  if (pokemonList[i].height > 1.5){
    // If so, display a special message
    document.write("<p>" + pokemonList[i].name + " [type: " + pokemonList[i].type + "]" + " (height: " + pokemonList[i].height + ") - Wow, That's Big! <br><br></p>")
  } 
  else {
  // if not, just display the name and height without comment
    document.write("<p>" + pokemonList[i].name + " [type: "+ pokemonList[i].type + "]" + " (height: " + pokemonList[i].height + ")<br><br></p>")// [")<br><br>" closes bracket and creates space with 2 new lines];

}
*/


  