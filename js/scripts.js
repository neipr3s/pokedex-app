let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=150';

 function add(pokemon) { 
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "detailsUrl" in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct")
  }
 }
 // allows external code to access the pokemonList //
 function getAll() {
  return pokemonList;
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

 function addListItem(pokemon){
  let element = document.querySelector('.pokemon-List');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name; 
  button.classList.add('button-style');
  listItem.appendChild(button); // appends the button as a child to the list item //
  element.appendChild(listItem); // appends the list item as a child to the container element// 
  addButtonEventListener(button, pokemon);
 }

 function showLoadingMessage() { // Create and append a loading message
  let loadingMessage = document.createElement('p');
  loadingMessage.textContent = 'Loading...'
  document.body.appendChild(loadingMessage);
 }

 function hideLoadingMessage(){
  let loadingMessage = document.querySelector('p');
  if (loadingMessage){
    loadingMessage.remove();
  }
 }
 
 function loadList() {
  showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
 }
    
   function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
    console.log(pokemon);
    }); 
  }
 
 function addButtonEventListener(button, pokemon){
  // Event listener for button click  
  button.addEventListener('click', function() {
    // Call showDetails function with the pokemon object as the parameter
      showDetails(pokemon);
  });
 }

 return { 
  getAll: getAll,
  add: add,
  findPokemonByName: findPokemonByName,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails  
 };
})();


// Iterate over the pokemonList and add each pokemon as a list item
pokemonRepository.loadList().then(function() {
 pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon); 
 });

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


  