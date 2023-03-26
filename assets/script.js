// alert('javaScript connected!!')

//const form  = document.querySelector("form")
const button = document.querySelector('#weather-button');


button.addEventListener("click", (event)=> {
  event.preventDefault();
  let city = document.querySelector("#location").value

  fetch(`https://wttr.in/${city}?format=j1`)
  .then((response) => response.json())
  .then((json) => {
     displayWeather(json,city)
      })
    .catch(showError(Error));
})

const displayWeather = (weatherData,city) => {
  console.log(weatherData)
  // location.innerText = "";
  const cityResults = document.querySelector('#city-results')
  const cityName = document.createElement('h3')
  const weatherResultList = document.createElement('ul')
  
  cityName.innerText = city;
  cityResults.append(cityName)
 
  const areaName = document.createElement('li')
  areaText = weatherData.nearest_area[0].areaName[0].value;
  areaName.innerHTML = `<strong>Region:</strong> ${areaText}`;
  weatherResultList.append(areaName)
  
  const regionName = document.createElement('li')
  regionText = weatherData.nearest_area[0].region[0].value;
  regionName.innerHTML = `<strong>Region:</strong> ${regionText}`;
  weatherResultList.append(regionName)

  const country = document.createElement('li')
  let countryText = weatherData.nearest_area.country[0].value;
  country.innerHTML =  `<strong> Country:</strong> ${countryText}`
  weatherResultList.append(country)
  
  const currentTemp = document.createElement('li')
  let feelsLike = weatherData.current_condition[0].feelsLikeF.value;
  currentTemp.innerHTML = `<strong> Currently:</strong> Feels Like ${feelsLike}°F` 
  weatherResultList.append(currentTemp)
  cityResults.append(weatherResultList)
  // window.montreal = weatherData //<-- delete later
  //let areaName = weatherData.nearest_area[0].area_name[0].value
  //let regionName = json.region[0].region[0].value
  //let country = json.region[0].country[0].value
  //let temperature = json.current_condition[0].feelsLikeF[0].value
  //For FEELS LIKEJohn... [copy and paste degree symbol]
}

const showError = (error) =>{

}

//https://wttr.in/New+York?format=j1