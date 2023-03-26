let receivedPromise = fetch(`https://wttr.in/Montreal?format=j1`);
const weatherBox = document.getElementById("weather-display");

receivedPromise
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    fillWeatherBox(json);
  });

const fillWeatherBox = (json) => {
  console.log(json);
};
