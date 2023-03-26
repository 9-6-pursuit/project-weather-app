const weatherDisplayList = document.getElementById("weather-display-list"); // the current weather info display area
const weatherHistoryList = document.getElementById("weather-history-list"); // list of previous searches
const weatherHeadline = document.getElementById("weather-location-headline"); // the current weather region
const searchForm = document.getElementById("weather-input"); // the search form

searchForm.addEventListener("submit", (event) => { // submitting the weather search form
  event.preventDefault();

  let searchText = document.getElementById("location").value; // what the user inputs
  document.getElementById("location").value = "";
  let baseURL = `https://wttr.in/` + searchText + `?format=j1`;

  fetch(baseURL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      fillWeatherDisplay(json, searchText);
      fillHistoryDisplay(searchText);
    });
});

const fillWeatherDisplay = (json, searchText) => {
  weatherDisplayList.innerText = "";
  const newListItem = document.createElement("li");
  newListItem.textContent = `Feels Like: ${json.current_condition[0].FeelsLikeF}° F`;
  weatherDisplayList.append(newListItem);
  weatherHeadline.innerHTML = `${searchText}`;
  console.log(json);
};

const fillHistoryDisplay = (searchText) => {
  const newListItem = document.createElement("li");
  newListItem.textContent = `${searchText}`;
  weatherHistoryList.append(newListItem);
};
