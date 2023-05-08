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

// Iterate over each item in the pokemonList array
for (let i = 0; i<pokemonList.length; i++) 
// Check if the Pokémon's height is greater than 1.5
  if (pokemonList[i].height > 1.5){
    // If so, display a special message
    document.write(pokemonList[i].name + " [type: " + pokemonList[i].type + "]" + " (height: " + pokemonList[i].height + ") - Wow, That's Big! <br><br>")
  } 
  else {
  // if not, just display the name and height without comment
    document.write(pokemonList[i].name + " [type: "+ pokemonList[i].type + "]" + " (height: " + pokemonList[i].height + ")<br><br>")// [")<br><br>" closes bracket and creates space with 2 new lines];

}


  