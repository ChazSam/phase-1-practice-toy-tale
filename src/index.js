let addToy = false;
const toyLink ="http://localhost:3000/toys"
const form = document.querySelector(".add-toy-form")
form.addEventListener("submit", addNewToy)

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");


  document.addEventListener("click", (event) =>{
    if(event.target.matches("like-btn")){
      updateLikes(event)
    }
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

function getToys(){
fetch(toyLink) 
  .then(resp => resp.json())
  .then( data => data.forEach(toy => showToys(toy))
  )
}

function showToys(toy){
  const toyCollection = document.getElementById("toy-collection")
  const div = document.createElement("div")
  div.classList.add("card")
 
  const h2 =document.createElement("h2")
  h2.textContent =toy.name
  const img = document.createElement("img")
  img.classList.add("toy-avatar")
  img.src = toy.image
  const p = document.createElement("p")
  p.textContent = `${toy.likes} likes`
  p.id = toy.id
  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.textContent = "like"
  button.id=toy.id 

  button.addEventListener("click", (e) =>{
    updateLikes(e)
  })
  div.append(h2, img, p, button)
  toyCollection.append(div)
}

function addNewToy(event){
event.preventDefault()
//console.log(event.target[0].value)
const [name, image] = event.target

  fetch(toyLink, {
    method: "POST",
    headers: {
    "content-type" : "application/json"

  },
  body: JSON.stringify({
    name: name.value,
    image: image.value,
    likes: 0,
  })
})
.then(resp => resp.json())
.then(resp => showToys(resp))
name.value=""
image.value=""
}

function updateLikes(e){
  e.preventDefault()
  fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body:JSON.stringify({
      likes: parseInt(e.target.parentElement.children[2].textContent.split(" ")[0], 10) +1
    })
  })
  .then(res=> res.json())
  .then(resp=> {
    
    const p= document.getElementById(resp.id)
    p.textContent = `${resp.likes} likes`
  })
}
