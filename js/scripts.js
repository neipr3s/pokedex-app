let pokemonRepository = (function() {
  let pokemonList = []; // An empty array to store Pokemon data
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=21';
  

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json(); // Parses the response as JSON
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon); // Adds each Pokemon to the pokemonList array
        }); 
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function(response) {
        return response.json(); // Parses the response as JSON
      })
      .then(function(details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types.map(function(type) {
          return type.type.name.toUpperCase();
        });
        return pokemon;
      }).catch(function(e) {
        console.error(e);
      });
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" && // Checks if the provided parameter is an object
      "name" in pokemon && // Checks if the object has a "name" property
      "detailsUrl" in pokemon // Checks if the object has a "detailsUrl" property
    ) {
      pokemonList.push(pokemon); // Adds the Pokemon object to the pokemonList array
    } else {
      console.log("pokemon is not correct"); // Logs an error message if the provided parameter is not a valid Pokemon object
    }
  }

  function getAll() {
    return pokemonList; // Returns the entire pokemonList array
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group'); // Selects the element with the class 'pokemon-list' from the HTML
    let listItem = document.createElement('li'); // Creates a new li element for the Pokemon list item
    listItem.classList.add('list-group-item');
    let button = document.createElement('button'); // Creates a new button element
    button.innerText = pokemon.name; // Sets the text content of the button to the Pokemon's name
    button.classList.add('btn'); // Adds the 'button-style' class to the button
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#myModal');
    listItem.appendChild(button); // Appends the button to the list item
    pokemonList.appendChild(listItem); // Appends the list item to the Pokemon list
    button.addEventListener('click', function() {
      showDetails(pokemon); // Shows the details of the Pokemon when the button is clicked
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(pokemonDetail){
      showModal(pokemonDetail);
    });
  }

  function showModal(pokemonDetail) {
    console.log("Details -> ", pokemonDetail);
    let titleElement = document.querySelector('.modal-title');
    titleElement.innerHTML = pokemonDetail.name;
    let imageElement = document.querySelector('.img-fluid.pokemon-image');
    imageElement.src = pokemonDetail.imageUrl;
    let heightElement = document.querySelector('.pokemon-height');
    heightElement.innerText = 'HEIGHT: ' + pokemonDetail.height;
    let weightElement = document.querySelector('.pokemon-weight');
    weightElement.innerText = 'WEIGHT: ' + pokemonDetail.weight;
    let typesElement = document.querySelector('.pokemon-types');
    typesElement.innerText = 'TYPE(S): ' + pokemonDetail.types;
  }
    
  function hideModal() {
    modalContainer.classList.remove('isVisible'); // Removes the 'isVisible' class from the modal container to hide the modal
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      hideModal(); // Hides the modal when the 'Escape' key is pressed
    }
  });

  return {
    getAll: getAll, // Exposes the getAll function
    add: add, // Exposes the add function
    addListItem: addListItem, // Exposes the addListItem function
    loadList: loadList, // Exposes the loadList function
    loadDetails: loadDetails, // Exposes the loadDetails function
    showDetails: showDetails, // Exposes the showDetails function
    showModal: showModal, // Exposes the showModal function
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon); // Loads the Pokemon list and adds list items for each Pokemon
  });
});

