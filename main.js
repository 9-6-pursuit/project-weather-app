// let receivedPromise = fetch(`https://wttr.in/Montreal?format=j1`);
let searchText = document.getElementById("location").value; // what the user inputs
const weatherDisplayList = document.getElementById("weather-display-list");
const weatherHeadline = document.getElementById("weather-location-headline");
const searchForm = document.querySelector("form");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let searchText = document.getElementById("location").value; // what the user inputs
  document.getElementById("location").value = "";
  let receivedPromise = `https://wttr.in/` + searchText + `?format=j1`;

  fetch(receivedPromise)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      fillWeatherDisplay(json);
    });
});

// receivedPromise
//   .then((response) => {
//     return response.json();
//   })
//   .then((json) => {
//     fillWeatherDisplay(json);
//   });

const fillWeatherDisplay = (json) => {
  const newListItem = document.createElement("li");
  newListItem.textContent = `Feels Like: ${json.current_condition[0].FeelsLikeF}° F`;
  weatherDisplayList.append(newListItem);
  weatherHeadline.textContent = `${searchText}`;
  console.log(json);
};

const getWeatherLocation = (location) => {};
