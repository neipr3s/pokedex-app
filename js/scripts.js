let pokemonRepository = (function() {
  let pokemonList = []; // empty array to store pokemon data
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=900';
  let modalContainer = document.querySelector('#modal-container'); // assigns modal to corresponding html tag

  function add(pokemon) { 
    if (
      typeof pokemon === "object" && // checks if pokemon is object with other parameters
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon); // if conditions are met, pokemon is pushed to the list
    } else {
      console.log("pokemon is not correct"); // if not, error message is logged
    }
  }

  function getAll() { // returns entire pokemonList array
    return pokemonList;
  }

  function findPokemonByName(name) {
    let filteredPokemon = pokemonList.filter(function(pokemon) {
      return pokemon.name === name;
    });
    return filteredPokemon;
  }

  function showLoadingMessage() {
    let loadingMessage = document.createElement('p');
    loadingMessage.textContent = 'Loading...';
    modalContainer.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loadingMessage = modalContainer.querySelector('p');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            types: item.types,
            weight: item.weight,
          };
          add(pokemon);
        });
        hideLoadingMessage();
      })
      .catch(function(e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  function loadDetails(pokemon) {
    showLoadingMessage();
    return fetch(pokemon.detailsUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types.map(function(type) {
          return type.type.name;
        });
        showModal(pokemon);
        hideLoadingMessage();
      })
      .catch(function(e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = ''; // clears content of modalContainer

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerHTML = '<span class="close-button">&#x2716;</span>';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let heightElement = document.createElement('h2');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let weightElement = document.createElement('h2');
    weightElement.innerText = 'Weight: ' + pokemon.weight;

    let typesElement = document.createElement('h2');
    typesElement.innerText = 'Type(s): ' + pokemon.types;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', pokemon.imageUrl);
    imageElement.setAttribute('alt', 'Image of ' + pokemon.name);

    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(typesElement);
    modalContainer.appendChild(modal);
    modal.appendChild(closeButtonElement);

    modalContainer.classList.add('isVisible');
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', function (event) {
    if (event.target === modalContainer) {
      hideModal();
    }
  });

  function hideModal() {
    modalContainer.classList.remove('isVisible');
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-style');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    findPokemonByName: findPokemonByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

