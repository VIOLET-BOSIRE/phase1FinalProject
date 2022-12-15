window.addEventListener("DOMContentLoaded", getScene)

//
parentContainer = document.querySelector("#allSpecies")

//this function shall fetch from the backend and return the required resources to load
function getScene () {
    fetch(`https://test-backend-production-30ff.up.railway.app/wildlife`)
      .then(response => response.json())
      .then(payloadIterator);
}
// iterates the payload to provide individual elements
function payloadIterator(payload){
    
    payload.forEach(renderItem);
}
function renderItem(element){
    const itemContainer = document.createElement('div');
    itemContainer.setAttribute('class', 'oneSpecies')

    const image = document.createElement('img');
    image.setAttribute("class", "img")
    image.src = element.image;
    itemContainer.appendChild(image);
    const name = document.createElement('h4');
    name.innerHTML = `Name: ${element.name}`;
    itemContainer.appendChild(name);

    const age = document.createElement('h5');
    age.innerHTML = `Age: ${element.age} years`;
    itemContainer.appendChild(age);

    
}
