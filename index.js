window.addEventListener("DOMContentLoaded", getScene)

//
parentContainer = document.querySelector("#allSpecies")

//this function shall fetch from the backend and return the required resources to load
function getScene () {
    fetch(`https://test-backend-production-30ff.up.railway.app/wildlife`)
      .then(response => response.json())
      .then(payloadIterator);
}
