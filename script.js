const form  = document.querySelector("form")
const BASE_URL = "https://github.com/chubin/wttr.in"
const main = document.querySelector("main.centered");

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    fetch(BASE_URL)
    .then((response) => response.json())
    // .then((json) => {
    //     json.results.forEach((result) => {
    //       displayCard(result)  
    //     })
    .then((json) => {
        displayCard(json)
    }).catch(displayError);
})