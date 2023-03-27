// alert('javaScript connected!!')

//const form  = document.querySelector("form")
const button = document.querySelector('#weather-button');
let prevHeaderH4 = false;
let prevHeaderUl = false;

button.addEventListener("click", (event)=> {
  event.preventDefault();
  let city = document.querySelector("#location").value;
  let currentResult = document.querySelector('#city-results')
    currentResult.innerHTML = "";
    fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
       displayWeather(json, city)
        })
      .catch(showError(Error));
})

const displayWeather = (weatherData,city) => {
  //console.log('weatherData: ', weatherData)
  
  const testCity = weatherData;
  const cityResults = document.querySelector('#city-results')
  const cityName = document.createElement('h2')
  const weatherResultList = document.createElement('ul')

  
  location.innerHTML = "";
  cityName.innerText = city;

  cityResults.append(cityName)
  
  const areaName = document.createElement('li')
  areaText = weatherData.nearest_area[0].areaName[0].value
  areaName.innerHTML = `<strong>Region:</strong> ${areaText}`;
  weatherResultList.append(areaName)
  //console.log(weatherData.nearest_area[0].areaName[0].value)
  
  const regionName = document.createElement('li')
  regionText = weatherData.nearest_area[0].region[0].value
  regionName.innerHTML = `<strong>Region:</strong> ${regionText}`;
  weatherResultList.append(regionName)
  
  const country = document.createElement('li')
  let countryText =  weatherData.nearest_area[0].country[0].value;
  country.innerHTML =  `<strong> Country:</strong> ${countryText}`
  weatherResultList.append(country)
    
  //console.log('feelsLike: ', weatherData.current_condition[0].FeelsLikeF)
  const currentTemp = document.createElement('li')
  let feelsLikeText = weatherData.current_condition[0].FeelsLikeF;
  currentTemp.innerHTML = `<strong> Currently:</strong> Feels Like ${feelsLikeText}°F` 
  weatherResultList.append(currentTemp)
  cityResults.append(weatherResultList)
  let prevCitySearch = city;
  let prevFeelsLike = feelsLikeText
  showPreviousSearchItem(prevCitySearch,prevFeelsLike)
  
}

const showPreviousSearchItem = (prevCitySearch,prevFeelsLike) => {
  //console.log('prevCity & PrevFeelsLike:',prevCitySearch,prevFeelsLike)
  let previousSearchDiv = document.querySelector('#previous-searches')
  if(prevHeaderH4 !== true) {
    createPrevSearchHeader(previousSearchDiv) //creates an h4 element
  }
  
  if(prevHeaderUl !== true){
    createPrevSearchListUL(previousSearchDiv) // creates a ul element
  }
  
  createPrevListItems(previousSearchDiv,prevCitySearch, prevFeelsLike) //creates a list item
  extraFeatures(previousSearchDiv,prevCitySearch, prevFeelsLike)
  listItemText = ""
}

const showError = (error) =>{

}

const inputField= document.querySelector('#location')
inputField.addEventListener('mouseEnter',(event) => {

})

const createPrevSearchHeader = (previousSearchDiv) => {
  // Generates the header for previous search list
    let previousSearchHeader = document.createElement('h4');
    previousSearchHeader.innerText = 'Previous Searches';
    previousSearchDiv.append(previousSearchHeader);
    prevHeaderH4 = true;
}

const createPrevSearchListUL = (previousSearchDiv) => {
  //generates the unordered list tag for the previous search list
  if(document.querySelector('#previous-searches')===undefined){
    let previousSearch_Ul = document.createElement('ul');
    previousSearch_Ul.setAttribute('class', 'left-justify');
    previousSearchDiv.append(previousSearch_Ul);
    prevHeaderUl = true
  };
}
const createPrevListItems = (previousSearchDiv,prevCitySearch, prevFeelsLike) => {
  //generates the list items of previous weather searches
  let previousListItem = document.createElement('li');
  previousListItem.setAttribute('class', 'smallFont');
  let listItemText = `<a href="https://wttr.in/${prevCitySearch}?format=j1">${prevCitySearch}</a> - ${prevFeelsLike}°F`;
  previousListItem.innerHTML = listItemText;
  previousSearchDiv.append(previousListItem);
}

const extraFeatures = (previousSearchDiv, prevCitySearch, prevFeelsLike) => {
  const threeDayForecast = document.querySelectorAll('.extra-features');
  let days = ['Today','Tomorrow','Day After Tomorrow']
  console.log(days[0],days[1],days[2])
  threeDayForecast.innerHTML = "<h4>Today, Tomorrow, Day After Tomorrow</h4>"

  // days.forEach((day) => {
    //Average Temperature:
    
    let todayHdr = document.createElement('h4')
    todayHdr.innerText = days;
    console.log(todayHdr.innerText)
    //threeDayForecast.innerHTML = "<h4>Today, Tomorrow, Day After Tomorrow</h4>"
    // console.log('threeDayForecast',threeDayForecast);

    // let todayUl = document.createElement('ul')
    // let avgTemp = document.createElement('li')
    // avgTemp.setAttribute('class', day)
    // avgTemp.innerText = 'Tomorrow';
    // threeDayForecast.append(avgTemp)
    
    // //Max Temperature:
    // let maxTemp = document.createElement('li')
    // maxTemp.setAttribute('class', day)
    // maxTemp.innerText = day
    // threeDayForecast.append(maxTemp)
    
    // //Min Temperature:
    // let minTemp = document.createElement('li')
    // minTemp.setAttribute('class', day)
    // minTemp.innerText = day;
    // threeDayForecast.append(minTemp)
  // })
}