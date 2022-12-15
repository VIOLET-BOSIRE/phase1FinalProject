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

    const location = document.createElement('h6');
    location.innerHTML = `Location ${element.location}`;
    itemContainer.appendChild(location);
    

    const description = document.createElement('p');
    description.innerHTML = `${element.description}`;
    itemContainer.appendChild(description);

    const ammendB = document.createElement('button');
    ammendB.setAttribute('class', 'ammBtn')
    itemContainer.appendChild(ammendB);
    ammendB.innerHTML = `<a href="#input-form">Edit Item</a>`;

    ammendB.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('instructions').innerHTML = "Please input the updated item details below";
        const tempUpdate = document.getElementById('submit').innerText = "Update"
        if (tempUpdate.innerText = "Update"){
            ammender(element.id)
        }else{
            return null;
        }        
    }) 
    

    const deleteB = document.createElement('button');
    deleteB.setAttribute('class', 'delbtn')
    itemContainer.appendChild(deleteB);
    deleteB.innerText = "Remove Item";

    deleteB.addEventListener('click', () => {
        deleteScene(element);
    })

    
    parentContainer.appendChild(itemContainer)

}

const form = document.querySelector("#input-form")
form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault();
    let sceneData = {
        name:e.target.name.value,
        age:e.target.age.value,
        location:e.target.location.value,
        description:e.target.description.value,
        image:e.target.image
    }

    postData(sceneData)
    form.reset();

}

function postData(sceneData){
    fetch("https://test-backend-production-30ff.up.railway.app/wildlife", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(sceneData)
        
    })
}

function ammender(id){
    console.log(id)
}

function deleteScene(scene){
    fetch(`https://test-backend-production-30ff.up.railway.app/wildlife/${scene.id}`, {
        method: 'DELETE'
    })
}



