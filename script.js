// const textField = document.querySelector("#search")
// const nameofCity = textField.value

// let BASE_URL = "https://wttr.in/" + nameofCity + "?format=j1";

// https://wttr.in/brooklyn?format=j1
// https://wttr.in/Montreal?format=j1
function currentWeather(search) {
    fetch("https://wttr.in/" + search + "?format=j1")
    .then(response => { return response.json()})
    .then(json => { displayWeather(json) })
    .then(json => {futureForecast(json) })
    .catch();
    // fetch(BASE_URL + search)
    //     .then((response) => response.json())
    //     .then(displayWeather)
    //     .catch();
}
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    currentWeather(document.getElementById("search").value)
    // currentWeather(event.form)
    // document.getElementById("search").value = ""
});

function displayWeather(result) {
    const section = document.querySelector("main.placeholder")
    const article = document.createElement("article")
    const h3 = document.createElement("h3")
    const h4 = document.createElement("h4")
    const secondH4 = document.createElement("h4")
    const thirdH4 = document.createElement("h4")
    const fourthH4 = document.createElement("h4")
    h3.textContent = `${result.nearest_area[0].areaName[0].value}`
    h4.textContent =  `${"Area: "} ${result.nearest_area[0].areaName[0].value}`
    secondH4.textContent = `${"Region: "} ${result.nearest_area[0].region[0].value}`
    thirdH4.textContent = `${"Country: "} ${result.nearest_area[0].country[0].value}`
    fourthH4.textContent = `${"Currently: "} ${"Feels Like"}      ${result.current_condition[0].FeelsLikeF} ${"F"}`
     article.append(h3, h4, secondH4, thirdH4, fourthH4)
     section.append(article)
}

function futureForecast(weather) {
    const section = document.querySelector("aside.forecast")
    const article = document.createElement("article")
    const h3 = document.createElement("h3")
    h3.textContent = `${"Today"}`
}