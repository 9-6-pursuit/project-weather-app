const textField = document.querySelector("#search")
const nameofCity = textField.value

let BASE_URL = "https://wttr.in/" + nameofCity + "?format=j1";

// https://wttr.in/brooklyn?format=j1
// https://wttr.in/Montreal?format=j1
function currentWeather(search) {
    fetch("https://wttr.in/" + search + "?format=j1")
    .then(response => { return response.json()})
    .then(json => { displayWeather(json) })
    .catch();
    // fetch(BASE_URL + search)
    //     .then((response) => response.json())
    //     .then(displayWeather)
    //     .catch();
}
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    currentWeather(document.getElementById("search").value = "")
    // currentWeather(event.form)
    // document.getElementById("search").value = ""
});

function displayWeather(result) {
    const section = document.querySelector("main.placeholder")
    const article = document.createElement("article")
    const h3 = document.createElement("h3")
     h3.textContent = `${result.nearest_area.areaName}`
     article.append(h3)
     section.append(article)
}