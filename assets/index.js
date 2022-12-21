window.addEventListener("DOMContentLoaded", getScene)

//select the container to display all fetched items
const parentContainer = document.getElementById("allSpecies")

// define values to start seeking from endpoint on user request
const startDoc = document.getElementById("trail-form")


startDoc.addEventListener("submit", (e) =>{
    e.preventDefault();
    let startRoute = e.target.startTrail.value;
    parentContainer.innerHTML = "";
    selectScene(startRoute); 
})

// fetch data from a specified resourece
function selectScene (startRoute) {
    fetch(` http://localhost:3000/${startRoute}`)
      .then(response => response.json())
      .then(payloadIterator);
}

//this function shall fetch the default landing page data
function getScene () {
    fetch(` http://localhost:3000/wildlife`)
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
    // add all created items to the parent container
    parentContainer.appendChild(itemContainer)
}

const form = document.querySelector("#input-form")
form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault();

    let trail = document.querySelector("#categories").value
    let sceneData = {
        name:e.target.name.value,
        age:e.target.age.value,
        location:e.target.location.value,
        description:e.target.description.value,
        image:e.target.image.value
    }

    postData(trail, sceneData)
    form.reset();

}

function postData(trail, sceneData){
    console.log(sceneData)
    fetch(`http://localhost:3000/${trail}`, {
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
    fetch(` http://localhost:3000/${scene.id}`, {
        method: 'DELETE'
    })
}

document.getElementById('log-in').addEventListener('click', ()=>{
    document.getElementById('topRightFixed').style.display = "block"

    const submitDetail = document.getElementById('userDetailSubmission')
    submitDetail.addEventListener("click", (e)=> {
        e.preventDefault();
        document.getElementById('topRightFixed').style.display = "none"
    })
    
})