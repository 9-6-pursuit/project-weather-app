const history = [];
const searchButton = document.querySelector("button");

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    let cityInput = document.getElementById("city-input");
    history.unshift(cityInput.value);
    let cityName = cityInput.value.replaceAll(" ", "+");
    cityInput.value = "";

    fetch(`https://wttr.in/${cityName}?format=j1`)
    .then(response => response.json())
    .then(json => {
        showWeather(json);
    })
})

function showWeather(weather) {
    let weatherBox = document.querySelector(".weather-box");
    weatherBox.innerHTML = "";

    let header = document.createElement("h2");
    header.textContent = history[0];
    
    let area = document.createElement("li");
    area.className = "weather-box-item";
    area.innerHTML = `<strong>Area:</strong> ${weather.nearest_area[0].areaName[0].value}`;

    let region = document.createElement("li");
    region.className = "weather-box-item";
    region.innerHTML = `<strong>Region:</strong> ${weather.nearest_area[0].region[0].value}`;

    let country = document.createElement("li");
    country.className = "weather-box-item";
    country.innerHTML = `<strong>Country:</strong> ${weather.nearest_area[0].country[0].value}`;

    let currently = document.createElement("li");
    currently.className = "weather-box-item";
    currently.innerHTML = `<strong>Currently:</strong> Feels like ${weather.current_condition[0].FeelsLikeF} °F`;

    weatherBox.append(header, area, region, country, currently);
}
