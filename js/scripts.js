
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
 
 function getAll() {
  return pokemonList;
 }

 function add(pokemon) {
  const expectedKeys = ['name', 'type', 'height'];
  const actualKeys = Object.keys(pokemon);

/*  function findPokemonByName(name){
    return pokemonRepository.filter(pokemon => pokemon.name === name);
  }
*/
  if(typeof pokemon === 'object' && expectedKeys.every(key => actualKeys.includes(key))){
  pokemonList.push(pokemon);
  } else {
    console.error('You can only add an object to the pokemon list')
  }

 }

 return {
  getAll: getAll,
  add: add,
  //findPokemonByName: findPokemonByName  
 };
})();

pokemonRepository.getAll().forEach(function(pokemon){
  // Check if the Pokémon's height is greater than 1.5
  if (pokemon.height > 1.5){
    // If so, display a special message
    document.write("<p>" + pokemon.name + " [type: " + pokemon.type + "]" + " (height: " + pokemon.height + ") - Wow, That's Big! <br><br></p>")
  } 
  else {
  // if not, just display the name and height without comment
    document.write("<p>" + pokemon.name + " [type: "+ pokemon.type + "]" + " (height: " + pokemon.height + ")<br><br></p>")// [")<br><br>" closes bracket and creates space with 2 new lines];
  }
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


  