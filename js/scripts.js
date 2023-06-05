let pokemonRepository = (function() {
  let pokemonList = []; // An empty array to store Pokemon data
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=250';
  let modalContainer = document.querySelector('#modal-container'); // Selects the modal container element from the HTML

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

  function findPokemonByName(name) {
    let filteredPokemon = pokemonList.filter(function(pokemon) {
      return pokemon.name === name; // Filters the pokemonList array to find Pokemon with a matching name
    });
    return filteredPokemon; // Returns an array of matching Pokemon
  }

  function showLoadingMessage() {
    let loadingMessage = document.createElement('p'); // Creates a new paragraph element
    loadingMessage.textContent = 'Loading...'; // Sets the text content of the loading message
    modalContainer.appendChild(loadingMessage); // Appends the loading message to the modal container element
  }

  function hideLoadingMessage() {
    let loadingMessage = modalContainer.querySelector('p'); // Selects the loading message element from the modal container
    if (loadingMessage) {
      loadingMessage.remove(); // Removes the loading message element from the modal container
    }
  }

  function loadList() {
    showLoadingMessage(); // Displays the loading message
    return fetch(apiUrl)
      .then(function(response) {
        return response.json(); // Parses the response as JSON
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            types: item.types,
            weight: item.weight,
          };
          add(pokemon); // Adds each Pokemon to the pokemonList array
        });
        hideLoadingMessage(); // Hides the loading message
      })
      .catch(function(e) {
        console.error(e);
        hideLoadingMessage(); // Hides the loading message in case of an error
      });
  }

  function loadDetails(pokemon) {
    showLoadingMessage(); // Displays the loading message
    return fetch(pokemon.detailsUrl)
      .then(function(response) {
        return response.json(); // Parses the response as JSON
      })
      .then(function(details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types.map(function(type) {
          return type.type.name;
        });
        showModal(pokemon); // Shows the modal with the Pokemon's details
        hideLoadingMessage(); // Hides the loading message
      })
      .catch(function(e) {
        console.error(e);
        hideLoadingMessage(); // Hides the loading message in case of an error
      });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = ''; // Clears the content of the modal container

    let modal = document.createElement('div'); // Creates a new div element for the modal
    modal.classList.add('modal'); // Adds the 'modal' class to the modal div

    let closeButtonElement = document.createElement('button'); // Creates a new button element for the close button
    closeButtonElement.classList.add('modal-close'); // Adds the 'modal-close' class to the close button
    closeButtonElement.innerHTML = '<span class="close-button">&#x2716;</span>'; // Sets the HTML content of the close button
    closeButtonElement.addEventListener('click', hideModal); // Attaches an event listener to the close button to hide the modal

    let titleElement = document.createElement('h1'); // Creates a new h1 element for the Pokemon's name
    titleElement.innerText = pokemon.name; // Sets the text content of the title element to the Pokemon's name

    let heightElement = document.createElement('h2'); // Creates a new h2 element for the Pokemon's height
    heightElement.innerText = 'Height: ' + pokemon.height; // Sets the text content of the height element to the Pokemon's height

    let weightElement = document.createElement('h2'); // Creates a new h2 element for the Pokemon's weight
    weightElement.innerText = 'Weight: ' + pokemon.weight; // Sets the text content of the weight element to the Pokemon's weight

    let typesElement = document.createElement('h2'); // Creates a new h2 element for the Pokemon's types
    typesElement.innerText = 'Type(s): ' + pokemon.types; // Sets the text content of the types element to the Pokemon's types

    let imageElement = document.createElement('img'); // Creates a new img element for the Pokemon's image
    imageElement.setAttribute('src', pokemon.imageUrl); // Sets the source attribute of the image element to the Pokemon's image URL
    imageElement.setAttribute('alt', 'Image of ' + pokemon.name); // Sets the alt attribute of the image element to a description of the Pokemon's image

    modal.appendChild(titleElement); // Appends the title element to the modal div
    modal.appendChild(imageElement); // Appends the image element to the modal div
    modal.appendChild(heightElement); // Appends the height element to the modal div
    modal.appendChild(weightElement); // Appends the weight element to the modal div
    modal.appendChild(typesElement); // Appends the types element to the modal div
    modalContainer.appendChild(modal); // Appends the modal div to the modal container
    modal.appendChild(closeButtonElement); // Appends the close button element to the modal div

    modalContainer.classList.add('isVisible'); // Adds the 'isVisible' class to the modal container to show the modal
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      hideModal(); // Hides the modal when the 'Escape' key is pressed
    }
  });

  modalContainer.addEventListener('click', function (event) {
    if (event.target === modalContainer) {
      hideModal(); // Hides the modal when clicking outside the modal content
    }
  });

  function hideModal() {
    modalContainer.classList.remove('isVisible'); // Removes the 'isVisible' class from the modal container to hide the modal
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list'); // Selects the element with the class 'pokemon-list' from the HTML
    let listItem = document.createElement('li'); // Creates a new li element for the Pokemon list item
    let button = document.createElement('button'); // Creates a new button element
    button.innerText = pokemon.name; // Sets the text content of the button to the Pokemon's name
    button.classList.add('button-style'); // Adds the 'button-style' class to the button
    listItem.appendChild(button); // Appends the button to the list item
    pokemonList.appendChild(listItem); // Appends the list item to the Pokemon list
    button.addEventListener('click', function() {
      showDetails(pokemon); // Shows the details of the Pokemon when the button is clicked
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon); // Loads the details of the Pokemon
  }

  return {
    getAll: getAll, // Exposes the getAll function
    add: add, // Exposes the add function
    findPokemonByName: findPokemonByName, // Exposes the findPokemonByName function
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

