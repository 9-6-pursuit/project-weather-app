// let receivedPromise = fetch(`https://wttr.in/Montreal?format=j1`);
// let searchText = document.getElementById("location").value; // what the user inputs
const weatherDisplayList = document.getElementById("weather-display-list");
const weatherHistoryList = document.getElementById("weather-history-list");
const weatherHeadline = document.getElementById("weather-location-headline");
const searchForm = document.querySelector("form");

searchForm.addEventListener("submit", (event) => {
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

// receivedPromise
//   .then((response) => {
//     return response.json();
//   })
//   .then((json) => {
//     fillWeatherDisplay(json);
//   });

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

// const getWeatherLocation = (location) => {};
