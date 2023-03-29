const weatherDisplayList = document.getElementById("weather-display-list"); // the current weather info display area
const weatherHistoryList = document.getElementById("weather-history-list"); // list of previous searches
const weatherHeadline = document.getElementById("weather-location-headline"); // the current weather region
const searchForm = document.getElementById("weather-input"); // the search form
const warningLine = document.getElementById("warning");
let warned = false;

searchForm.addEventListener("submit", (event) => {
  // submitting the weather search form
  event.preventDefault(); // preventing the form from reloading the page
  if (warned) {
    warningLine.innerText = "";
    warned = false;
  }

  let searchText = document.getElementById("location").value; // what the user inputs
  document.getElementById("location").value = ""; // clearing the search box
  let baseURL = `https://wttr.in/` + searchText + `?format=j1`; // forming a proper URL

  fetch(baseURL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      fillWeatherDisplay(json, searchText);
      fillHistoryDisplay(searchText);
      console.log(json);
    });
});

const fillWeatherDisplay = (json, searchText) => {
  weatherDisplayList.innerText = ""; // clearing the search box
  weatherHeadline.innerHTML = `${searchText}`; // Titling the weather report

  const area = document.createElement("li");
  area.innerHTML = `<strong>Area:</strong> ${json.nearest_area[0].areaName[0].value}`; // getting the area

  const region = document.createElement("li");
  region.innerHTML = `<strong>Region:</strong> ${json.nearest_area[0].region[0].value}`; // getting the region

  const country = document.createElement("li");
  country.innerHTML = `<strong>Country:</strong> ${json.nearest_area[0].country[0].value}`; // getting the country

  const currently = document.createElement("li");
  currently.innerHTML = `<strong>Feels Like:</strong> ${json.current_condition[0].FeelsLikeF}°F`; // getting the 'Feels Like' temperature
  weatherDisplayList.append(area, region, country, currently); // pushing all this info to the weather report display
};

const fillHistoryDisplay = (searchText) => {
  // pushing search texts to the 'Previous Searches' list
  const newListItem = document.createElement("li");
  newListItem.textContent = `${searchText}`;
  weatherHistoryList.append(newListItem);
};
