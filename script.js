const BASE_URL = "https://wttr.in/";
const form = document.querySelector("form");
const main = document.querySelector("main");
const mainDisplay = document.querySelector(".main-display");
const right = document.querySelector(".right-history");
const forecastElement = document.querySelector(".forecast");
const searchPrevious = document.querySelector(".search-previous");
const noPrevious = document.querySelector(".no-previous");


form.addEventListener("submit", (event) => {
  if (noPrevious) {
    noPrevious.remove();
  }

  event.preventDefault();
  const input = inputFormat(event.target.location.value);
  form.reset();
  const url = getURL(BASE_URL, input);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      savePrevious(data, input);
      displayWeatherContent(data, input);
      displayHtmlForecast(data);
    })
    .catch(console.log);
});


function inputFormat(location) {
  let formatLocation = "";
  location = location.trim();
  const texts = location.split(" ");
  
  for (const text of texts) {
    const firstLetter = text.charAt(0).toUpperCase();
    const remainLetter = text.slice(1).toLowerCase();
    formatLocation += firstLetter + remainLetter + " ";
  }
  return formatLocation.trim();
}


function getURL(base, location) {
  location = location.trim();
  location = location.replaceAll(" ", "+");
  return (base += location + "?format=j1");
}


function weatherContent(obj) {
  const area = obj.areaName[0].value;
  const region = obj.region[0].value;
  const country = obj.country[0].value;
  return { area, region, country };
}


function displayWeatherContent(data, input) {
  const nearestArea = weatherContent(data.nearest_area[0]);
  const { area, region, country } = nearestArea;
  let nearest = "Area";
  if (input !== area) {
    nearest = "Nearest Area";
  }
  const feelsLike = data.current_condition[0]["FeelsLikeF"] + " °F";
  const hourlyWeather = data.weather[0].hourly[0];
  const { chanceofrain, chanceofsnow, chanceofsunshine } = hourlyWeather;

  let icon = "";
  if (chanceofsunshine > 50) {
    icon = "<img src='./assets/icons8-summer.gif' alt='sun' class='logo'/>";
  } else if (chanceofrain > 50) {
    icon = "<img src='./assets/icons8-torrential-rain.gif' alt='rain' class='logo'/>";
  } else if (chanceofsnow > 50) {
    icon = "<img src='./assets/icons8-light-snow.gif' alt='snow' class='logo'/>";
  }

  const weatherContentHTML = `
    ${icon}
    <h2>${input}</h2>
    <p>${nearest}: ${area}</p>
    <p>Region: ${region}</p>
    <p>Country: ${country}</p>
    <p>Currently: ${feelsLike}</p>
    <p>Chance of Sunshine: ${chanceofsunshine}</p>
    <p>Chance of Rain: ${chanceofrain}</p>
    <p>Chance of Snow: ${chanceofsnow}</p>
  `;

  mainDisplay.innerHTML = weatherContentHTML;
  main.style.backgroundColor = "rgba(90, 89, 89, 0.754)";
}


function getTemperatureContent(data) {
  return data.weather.slice(0, 3).map((item) => {
    const { avgtempF, mintempF, maxtempF } = item;
    return { avgtempF, mintempF, maxtempF };
  });
}


function displayHtmlForecast(data) {
  const threeDays = ["Today", "Tomorrow", "Day after Tomorrow"];
  const threeDayData = getTemperatureContent(data);

  const forecastItems = forecastElement.children;
  Array.from(forecastItems).forEach((item, index) => {
    const { avgtempF, mintempF, maxtempF } = threeDayData[index];
    const html = `
      <h4>${threeDays[index]}</h4>
      <p>Average Temperature: ${avgtempF} °F</p>
      <p>Min Temperature: ${mintempF} °F</p>
      <p>Max Temperature: ${maxtempF} °F</p>
    `;
    item.innerHTML = html;
  });
}


function savePrevious(data, input) {
  const feelLike = ` - ${data.current_condition[0]["FeelsLikeF"]}°F`;

  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.textContent = input;
  a.addEventListener("click", (event) => {
    displayWeatherContent(data, input);
    displayHtmlForecast(data);
  });

  li.textContent = feelLike;
  li.prepend(a);
  searchPrevious.append(li);
}

