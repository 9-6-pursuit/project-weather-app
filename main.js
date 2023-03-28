const searchButton = document.querySelector("button");
let input = document.getElementById("city-input");
let clickCount = 0;

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (input.value) {
        let cityName = input.value.replaceAll(" ", "+");
    
        fetch(`https://wttr.in/${cityName}?format=j1`)
        .then(response => response.json())
        .then(json => showWeather(json))
        .catch(showError);
    }
})

input.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
})

function showWeather(json) {
    let weatherBox = document.querySelector(".weather-box");
    let searchList = document.querySelector(".search-list");
    let history = `${json.nearest_area[0].areaName[0].value} (${json.current_condition[0].FeelsLikeF}°F)`

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
    area.innerHTML = `<strong>Area:</strong> ${json.nearest_area[0].areaName[0].value}`;

    let region = document.createElement("li");
    region.className = "weather-box-item";
    region.innerHTML = `<strong>Region:</strong> ${json.nearest_area[0].region[0].value}`;

    let country = document.createElement("li");
    country.className = "weather-box-item";
    country.innerHTML = `<strong>Country:</strong> ${json.nearest_area[0].country[0].value}`;

    let currently = document.createElement("li");
    currently.className = "weather-box-item";
    currently.innerHTML = `<strong>Currently:</strong> Feels like ${json.current_condition[0].FeelsLikeF}°F`;

    weatherBox.prepend(header, area, region, country, currently);

    let days = ["Today", "Tomorrow", "Day After Tomorrow"];
    for (let i = 0; i < 3; i++) {
        let theDay = document.querySelector(`.day${i}`);
        theDay.innerHTML = "";
        let header = document.createElement("h3");
        header.className = "bottom-header";
        header.innerText = days[i];
        let avgTemp = document.createElement("li");
        avgTemp.className = "bottom-text";
        avgTemp.innerHTML = `<strong>Avarage Temperature:</strong> ${json.weather[i].avgtempF}°F`;
        let maxTemp = document.createElement("li");
        maxTemp.className = "bottom-text";
        maxTemp.innerHTML = `<strong>Max Temperature:</strong> ${json.weather[i].maxtempF}°F`;
        let minTemp = document.createElement("li");
        minTemp.className = "bottom-text";
        minTemp.innerHTML = `<strong>Min Temperature:</strong> ${json.weather[i].mintempF}°F`;
        theDay.append(header, avgTemp, maxTemp, minTemp);
    }
    document.querySelector(".bottom").style["background-color"] = "#bbbbbb";
}

function showError(error) {
    console.log(error);
}
