// // const textField = document.querySelector("#search")
// // const nameofCity = textField.value

// // let BASE_URL = "https://wttr.in/" + nameofCity + "?format=j1";

// // https://wttr.in/brooklyn?format=j1
// // https://wttr.in/Montreal?format=j1
// // function currentWeather(search) {
// //     fetch("https://wttr.in/" + search + "?format=j1")
// //     .then(response => { return response.json()})
// //     .then(json => { displayWeather(json) })
// //     .then(json => {futureForecast(json) })
// //     .catch();
// //     // fetch(BASE_URL + search)
// //     //     .then((response) => response.json())
// //     //     .then(displayWeather)
// //     //     .catch();
// // }
// // const form = document.querySelector("form");
// // form.addEventListener("submit", (event) => {
// //     event.preventDefault();
// //     currentWeather(document.getElementById("search").value)
// //     // currentWeather(event.form)
// //     // document.getElementById("search").value = ""
// // });

// // function displayWeather(result) {
// //     const section = document.querySelector("main.placeholder")
// //     const article = document.createElement("article")
// //     const h3 = document.createElement("h3")
// //     const h4 = document.createElement("h4")
// //     const secondH4 = document.createElement("h4")
// //     const thirdH4 = document.createElement("h4")
// //     const fourthH4 = document.createElement("h4")
// //     h3.textContent = `${result.nearest_area[0].areaName[0].value}`
// //     h4.textContent =  `${"Area: "} ${result.nearest_area[0].areaName[0].value}`
// //     secondH4.textContent = `${"Region: "} ${result.nearest_area[0].region[0].value}`
// //     thirdH4.textContent = `${"Country: "} ${result.nearest_area[0].country[0].value}`
// //     fourthH4.textContent = `${"Currently: "} ${"Feels Like"}      ${result.current_condition[0].FeelsLikeF}${"°F"}`
// //      article.append(h3, h4, secondH4, thirdH4, fourthH4)
// //      section.append(article)
// // }

// // function futureForecast(weather) {
// //     const section = document.querySelector("aside.forecast")
// //     const article = document.createElement("article")
// //     const h3 = document.createElement("h3")
// //     h3.textContent = `${"Today"}`
// // }

const submitButton = document.querySelector("button");
let input = document.getElementById("city-input");
let clickCount = 0;
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (input.value) {
        let locationName = input.value.replaceAll(" ", "+");
    
        fetch(`https://wttr.in/${locationName}?format=j1`)
        .then(response => response.json())
        .then(json => displayWeather(json))
        .catch(displayError);
    }
})

input.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
})

function displayWeather(result) {
    let weatherForecast = document.querySelector(".weather-box");
    let searchList = document.querySelector(".search-list");
    let history = `${result.nearest_area[0].areaName[0].value} (${result.current_condition[0].FeelsLikeF}°F)`

    if (!clickCount) {
        document.getElementById("empty").remove();
        document.querySelector(".nolist").remove();
        searchList.innerHTML += `<li class="sublist">${history}</li>`;
        clickCount ++;
    }
    else {
        let boxItems = document.querySelectorAll(".weather-box-item");
        boxItems.forEach(item => item.remove());
    }
    if (!searchList.innerHTML.includes(history)) {
        let listHeader = document.getElementById("history-h3");
        listHeader.insertAdjacentHTML("afterend", `<li class="sublist">${history}</li>`);
    }
    
    let header = document.createElement("h2");
    header.className = "weather-box-item";
    header.textContent = input.value;
    input.value = "";
    
    let area = document.createElement("li");
    area.className = "weather-box-item";
    area.innerHTML = `<strong>Area:</strong> ${result.nearest_area[0].areaName[0].value}`;
    let region = document.createElement("li");
    region.className = "weather-box-item";
    region.innerHTML = `<strong>Region:</strong> ${result.nearest_area[0].region[0].value}`;
    let country = document.createElement("li");
    country.className = "weather-box-item";
    country.innerHTML = `<strong>Country:</strong> ${result.nearest_area[0].country[0].value}`;
    let currently = document.createElement("li");
    currently.className = "weather-box-item";
    currently.innerHTML = `<strong>Currently:</strong> Feels like ${result.current_condition[0].FeelsLikeF}°F`;

    weatherForecast.prepend(header, area, region, country, currently);

    let days = ["Today", "Tomorrow", "Day After Tomorrow"];
    for (let i = 0; i < 3; i++) {
        let theDay = document.querySelector(`.day${i}`);
        theDay.innerHTML = "";
        let header = document.createElement("h3")
        header.className = "bottom-header";
        header.innerText = days[i];
        let avgTemp = document.createElement("li");
        avgTemp.className = "lower-text";
        avgTemp.innerHTML = `<strong>Avarage Temperature:</strong> ${result.weather[i].avgtempF}°F`;
        let maxTemp = document.createElement("li");
        maxTemp.className = "lower-text";
        maxTemp.innerHTML = `<strong>Max Temperature:</strong> ${result.weather[i].maxtempF}°F`;
        let minTemp = document.createElement("li");
        minTemp.className = "lower-text";
        minTemp.innerHTML = `<strong>Min Temperature:</strong> ${result.weather[i].mintempF}°F`;
        theDay.append(header, avgTemp, maxTemp, minTemp);
    }

    document.querySelector(".lower").style["background-color"] = "#bbbbbb";
}

function displayError(error) {
    console.log(error);
}
