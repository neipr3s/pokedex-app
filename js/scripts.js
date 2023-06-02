let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) { 
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
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
            detailsUrl: item.url
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
        showModal(pokemon);
        hideLoadingMessage();
      })
      .catch(function(e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', pokemon.imageUrl);
    imageElement.setAttribute('alt', 'Image of ' + pokemon.name);

    // modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

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


     // let dialogPromiseReject;
      // function hideModal() {
      //   let modalContainer = document.querySelector('#modal-container');
      //   modalContainer.classList.remove('is-visible');
      // }
      // if (dialogPromiseReject) {
      //   dialogPromiseReject();
      //   dialogPromiseReject = null;
      // }

  // function showDialog(title, text) {
  //   showModal(title, text);

  //   let modalContainer = document.querySelector('#modal-container');

  //   let modal = modalContainer.querySelector('.modal');

  //   let confirmButton = document.createElement('button');
  //   confirmButton.classList.add('modal-confirm');
  //   confirmButton.innerText = 'Confirm';

  //   let cancelButton = document.createElement('button');
  //   cancelButton.classList.add('modal-cancel');
  //   cancelButton.innerText = 'Cancel';

  //   modal.appendChild(confirmButton);
  //   modal.appendChild(cancelButton);

  //   confirmButton.focus();


    // return new Promise((resolve, reject) => {
    //   cancelButton.addEventListener('click', hideModal);
    //   confirmButton.addEventListener('click', () => {
    //     dialogPromiseReject = null;
    //     hideModal();
    //     resolve();
    //   });

    //   dialogPromiseReject = reject;
    // });
  // }

  // document.querySelector('#show-modal').addEventListener('click', () => {
  //   showModal('Modal title', 'This is the modal content!');
  // });

  // document.querySelector('#show-dialog').addEventListener('click', () => {
  //   showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
  //     alert('confirmed!');
  //   }, () => {
  //     alert('not confirmed');
  //   });
  // })//