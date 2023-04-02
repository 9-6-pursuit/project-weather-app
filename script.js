// console.log("hello world"); //This is to make sure the JS file is linked to the HTML.

const weatherBox = document.getElementById("weather-box");
const threeDays = document.getElementById("three-days")
const cityNameInput = document.getElementById("city-name-input");
const getWeatherButton = document.getElementById("search-button");
const previousSearches = document.getElementsByClassName("previous-searches")[0];
const today = document.getElementsByClassName("today")[0];
const tomorrow = document.getElementsByClassName("tomorrow")[0];
const dayAfter = document.getElementsByClassName("day-after")[0];
// console.log(weatherBox); //This is to check that the above are working.
// console.log(cityNameInput); //This is to check that the above are working.
// console.log(getWeatherButton); //This is to check that the above are working.
// console.log(previousSearches); //This is to check that the above are working.

getWeatherButton.addEventListener("click", event => {
    // console.log("Button has been clicked on"); //This is to check that Event Listener is working.
    event.preventDefault();

    let cityName = cityNameInput.value;
    cityNameInput.value = '';

    let getWeatherData = fetch(`https://wttr.in/${cityName}?format=j1`); //fetches weather data from API.
    getWeatherData.then(response => {
        return response.json()
    }).then (weatherData => {
        fillWeatherBox(weatherData, cityName);
    });

});

const fillWeatherBox = (weatherData, cityName) => {
    weatherBox.innerHTML = '';

    addToPrevious(weatherData, cityName)

    let label = document.createElement('h3'); //creates a new element in HTML.
    label.textContent = cityName;
    weatherBox.append(label); //adds label to weather box.

    let areaName = weatherData.nearest_area[0].areaName[0].value;
    let area = document.createElement('li');
    area.className = `weather-box-item`; //adds a class name so this can be styled in CSS.
    area.innerHTML = `<strong>Area:</strong> ${areaName}`;
    weatherBox.append(area);
    
    let regionName = weatherData.nearest_area[0].region[0].value;
    let region = document.createElement('li');
    region.className = `weather-box-item`; //adds a class name so this can be styled in CSS.
    region.innerHTML = `<strong>Region:</strong> ${regionName}`;
    weatherBox.append(region);
    
    let countryName = weatherData.nearest_area[0].country[0].value;
    let country = document.createElement('li');
    country.className = `weather-box-item`; //adds a class name so this can be styled in CSS.
    country.innerHTML = `<strong>Country:</strong> ${countryName}`;
    weatherBox.append(country);
    
    let tempValue = weatherData.current_condition[0].temp_F;
    let temp = document.createElement('li');
    temp.className = `weather-box-item`; //adds a class name so this can be styled in CSS.
    temp.innerHTML = `<strong>Currently:</strong> ${tempValue}° F`;
    weatherBox.append(temp);
    
    let feelsLike = weatherData.current_condition[0].FeelsLikeF;
    let feels = document.createElement('li');
    feels.className = `weather-box-item`; //adds a class name so this can be styled in CSS.
    feels.innerHTML = `<strong>Feels like:</strong> ${feelsLike}° F`;
    weatherBox.append(feels);
    
    let chanceOfSunshine = weatherData.weather[0].hourly[0].chanceofsunshine;
    let sunshine = document.createElement('li');
    sunshine.className = `weather-box-item`; //adds a class name so this can be styled in CSS.
    sunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceOfSunshine}%`;
    weatherBox.append(sunshine);
    
    let chanceOfRain = weatherData.weather[0].hourly[0].chanceofrain;
    let rain = document.createElement('li');
    rain.className = `weather-box-item`; //adds a class name so this can be styled in CSS.
    rain.innerHTML = `<strong>Chance of Rain:</strong> ${chanceOfRain}%`;
    weatherBox.append(rain);
    
    let chanceOfSnow = weatherData.weather[0].hourly[0].chanceofsnow;
    let snow = document.createElement('li');
    snow.className = `weather-box-item`; //adds a class name so this can be styled in CSS.
    snow.innerHTML = `<strong>Chance of Snow:</strong> ${chanceOfSnow}%`;
    weatherBox.append(snow);

    let image = document.createElement("img");
    if (chanceOfSunshine > 50) {
        // image.setAttribute("'src", "./assets/icons8-summer.gif");
        image.src = "./assets/icons8-summer.gif"
        image.setAttribute("alt", "sun");
    } else if (chanceOfRain > 50) {
        image.src = "./assets/icons8-torrential-rain.gif";
        image.setAttribute("alt", "rain");
    } else if (chanceOfSnow > 50) {
        image.src = "./assets/icons8-light-snow.gif";
        image.setAttribute("alt", "snow");
    }
    weatherBox.prepend(image);

    today.innerHTML = '';
    tomorrow.innerHTML = '';
    dayAfter.innerHTML = '';

    let tod = document.createElement('h4');
    tod.innerHTML = `Today`;
    today.append(tod)

    let todaysAvg = weatherData.weather[0].avgtempF;
    let avg = document.createElement('li');
    avg.className = `overall`;
    avg.innerHTML = `<strong>Avg Temperature:</strong> ${todaysAvg}° F`;
    today.append(avg);
    
    let todaysMax = weatherData.weather[0].maxtempF;
    let max = document.createElement('li');
    max.className = `overall`;
    max.innerHTML = `<strong>Max Temperature:</strong> ${todaysMax}° F`;
    today.append(max);
    
    let todaysMin = weatherData.weather[0].mintempF;
    let min = document.createElement('li');
    min.className = `overall`;
    min.innerHTML = `<strong>Min Temperature:</strong> ${todaysMin}° F`;
    today.append(min);

    let tom = document.createElement('h4');
    tom.innerHTML = `Tomorrow`;
    tomorrow.append(tom)
    
    let tomorrowsAvg = weatherData.weather[1].avgtempF;
    let tomAvg = document.createElement('li');
    tomAvg.className = `overall`;
    tomAvg.innerHTML = `<strong>Avg Temperature:</strong> ${tomorrowsAvg}° F`;
    tomorrow.append(tomAvg);
    
    let tomorrowsMax = weatherData.weather[1].maxtempF;
    let tomMax = document.createElement('li');
    tomMax.className = `overall`;
    tomMax.innerHTML = `<strong>Max Temperature:</strong> ${tomorrowsMax}° F`;
    tomorrow.append(tomMax);
    
    let tomorrowsMin = weatherData.weather[1].mintempF;
    let tomMin = document.createElement('li');
    tomMin.className = `overall`;
    tomMin.innerHTML = `<strong>Min Temperature:</strong> ${tomorrowsMin}° F`;
    tomorrow.append(tomMin);

    let dayAf = document.createElement('h4');
    dayAf.innerHTML = `Day After Tomorrow`;
    dayAfter.append(dayAf)
    
    let dayAfterAvg = weatherData.weather[2].avgtempF;
    let afterAvg = document.createElement('li');
    afterAvg.className = `overall`;
    afterAvg.innerHTML = `<strong>Avg Temperature:</strong> ${dayAfterAvg}° F`;
    dayAfter.append(afterAvg);

    let dayAfterMax = weatherData.weather[1].maxtempF;
    let afterMax = document.createElement('li');
    afterMax.className = `overall`;
    afterMax.innerHTML = `<strong>Max Temperature:</strong> ${dayAfterMax}° F`;
    dayAfter.append(afterMax);

    let dayAfterMin = weatherData.weather[1].mintempF;
    let afterMin = document.createElement('li');
    afterMin.className = `overall`;
    afterMin.innerHTML = `<strong>Min Temperature:</strong> ${dayAfterMin}° F`;
    dayAfter.append(afterMin);
}
let addToPrevious = (weatherData, cityName) => {
    let noPrevious = document.getElementById('no-searches');
    if (noPrevious) {
        noPrevious.remove();
    }
let previous = document.createElement('li');
let name = document.createElement('a');
name.textContent = cityName;
name.href = "#";
previous.append(name);
previous.innerHTML += ` - ${weatherData.current_condition[0].temp_F}° F`;
previousSearches.append(previous)
}

const tempConverter = document.getElementById("temp-converter");
const convertedTemp = document.createElement("h4");
convertedTemp.className = `converted-temp`;
const convert = document.getElementById("convert");

tempConverter.addEventListener("submit", (event) => {
    event.preventDefault();

    let tempToConvert = event.target["temp-to-convert"].value;
    // console.log(tempToConvert);
    // console.log(event.target["convert-temp"].value);
    if (event.target["convert-temp"].value === "c") {
        let tempToC = (tempToConvert - 32) / 1.8;
        convertedTemp.innerText = `${tempToC.toFixed(2)}° C`;
        // console.log(tempToC);
    } else if (event.target["convert-temp"].value === "f") {
        let tempToF = tempToConvert * (9 / 5) + 32;
        convertedTemp.innerText = `${tempToF.toFixed(2)}° F`;
        // console.log(tempToF);
    }
    tempConverter.after(convertedTemp);
})

