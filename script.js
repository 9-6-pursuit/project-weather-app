const textField = document.querySelector("#search")
const nameofCity = textField.value

let BASE_URL = "https://wttr.in/" + nameofCity + "?format=j1";

// https://wttr.in/brooklyn?format=j1
// https://wttr.in/Montreal?format=j1
function currentWeather(search) {

    fetch(BASE_URL + search)
        .then((response) => response.json())
        .then(displayWeather)
        .catch();
}
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    currentWeather(event.form)
    document.getElementById("search").value = ""
});

function displayWeather(result) {
    const section = document.querySelector("main.placeholder")
    const h2 = document.createElement("h2")
     h2.textContent = `${result.nearest_area.areaName}`
     article.append(h2)
     section.append(article)
}