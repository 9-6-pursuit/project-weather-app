const searchButton = document.querySelector("button");
let input = document.getElementById("city-input");
let cityName = "";
let clickCount = 0;

searchButton.addEventListener("click", event => {
    event.preventDefault();
    if (input.value) {
        cityName = input.value;
        input.value = "";
        fetch(`https://wttr.in/${cityName.replaceAll(" ", "+")}?format=j1`)
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

function showWeather(data) {
    if (!clickCount) {
        document.getElementById("empty").remove();
        document.querySelector(".nolist").remove();
        clickCount ++;
    }
    else {
        let boxItems = document.querySelectorAll(".weather-box-item");
        boxItems.forEach(item => item.remove());
    }

    let header = document.createElement("h2");
    header.className = "weather-box-item";
    header.textContent = cityName;
    
    let area = document.createElement("li");
    area.className = "weather-box-item";
    area.innerHTML = `<strong>Area:</strong> ${data.nearest_area[0].areaName[0].value}`;

    let region = document.createElement("li");
    region.className = "weather-box-item";
    if (!data.nearest_area[0].region[0].value) {
        region.innerHTML = `<strong>Region:</strong> ${data.nearest_area[0].areaName[0].value}`;
    }
    else {
        region.innerHTML = `<strong>Region:</strong> ${data.nearest_area[0].region[0].value}`;
    }

    let country = document.createElement("li");
    country.className = "weather-box-item";
    country.innerHTML = `<strong>Country:</strong> ${data.nearest_area[0].country[0].value}`;

    let currently = document.createElement("li");
    currently.className = "weather-box-item";
    currently.innerHTML = `<strong>Currently:</strong> ${data.current_condition[0].temp_F}°F`;

    let feelsLike = document.createElement("li");
    feelsLike.className = "weather-box-item";
    feelsLike.innerHTML = `<strong>Feels Like:</strong> ${data.current_condition[0].FeelsLikeF}°F`;

    let sunshine = document.createElement("li");
    sunshine.className = "weather-box-item";
    sunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${data.weather[0].hourly[0].chanceofsunshine}`;

    let rain = document.createElement("li");
    rain.className = "weather-box-item";
    rain.innerHTML = `<strong>Chance of Rain:</strong> ${data.weather[0].hourly[0].chanceofrain}`;

    let snow = document.createElement("li");
    snow.className = "weather-box-item";
    snow.innerHTML = `<strong>Chance of Snow:</strong> ${data.weather[0].hourly[0].chanceofsnow}`;
    
    let weatherBox = document.querySelector(".weather-box");
    weatherBox.prepend(header, area, region, country, currently, feelsLike, sunshine, rain, snow);

    let img = document.createElement("img");
    img.className = "weather-box-item";
    if (data.weather[0].hourly[0].chanceofsunshine > 50) {
        img.src = "./assets/icons8-summer.gif";
        img.alt = "sun";
    }
    else if (data.weather[0].hourly[0].chanceofrain > 50) {
        img.src = "./assets/icons8-torrential-rain.gif";
        img.alt = "rain";
    }
    else if (data.weather[0].hourly[0].chanceofsnow > 50) {
        img.src = "./assets/icons8-light-snow.gif";
        img.alt = "snow";
    }
    weatherBox.prepend(img);

    let days = ["Today", "Tomorrow", "Day After Tomorrow"];
    for (let i = 0; i < 3; i++) {
        let theDay = document.querySelector(`.day${i}`);
        theDay.innerHTML = "";
        let header = document.createElement("h3");
        header.className = "bottom-header";
        header.innerText = days[i];
        let avgTemp = document.createElement("li");
        avgTemp.className = "bottom-text";
        avgTemp.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[i].avgtempF}°F`;
        let maxTemp = document.createElement("li");
        maxTemp.className = "bottom-text";
        maxTemp.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[i].maxtempF}°F`;
        let minTemp = document.createElement("li");
        minTemp.className = "bottom-text";
        minTemp.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[i].mintempF}°F`;
        theDay.append(header, avgTemp, maxTemp, minTemp);
    }

    let searchList = document.querySelector(".search-list");
    if (!searchList.innerHTML.includes(cityName)) {
        let aTag = document.createElement("a");
        aTag.href = "";
        aTag.innerText = cityName;
        let li = document.createElement("li");
        li.className = "sublist";
        li.append(aTag, ` (${data.current_condition[0].temp_F}°F)`);
        let listHeader = document.getElementById("history-h3");
        listHeader.parentNode.insertBefore(li, listHeader.nextSibling);

        aTag.addEventListener("click", event => {
            event.preventDefault();
            input.value = aTag.textContent;
            searchButton.click();
        })
    }
}

function showError(error) {
    console.log(error);
}
