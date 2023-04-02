
const button = document.querySelector('#weather-button');
let prevHeaderH4 = false;
let prevHeaderUl = false;
let prevSearches = false;

let initSearchArea = document.querySelector('#city-results')
initSearchArea.innerHTML = `<p class='initSearchArea'>Choose a location to view the weather.</p>`
let initPrevSearchArea = document.querySelector('#previous-searches')
initPrevSearchArea.innerHTML = `<h4>Previous Searches</h4><font size=-1><p>No previous searches.</p></font>`
let initThreeDayForecast = document.querySelector('#three-day-forecast')

button.addEventListener("click", (event)=> {
  event.preventDefault();
  let city = document.querySelector("#location").value;
  document.querySelector('#location').value = "";
  let currentResult = document.querySelector('#city-results');
    currentResult.innerHTML = "";
    initThreeDayForecast.innerText = "";
    prevSearches = prevSearches ? true : initPreviousSearch()
    fetch(`https://wttr.in/${city}?format=j1`)  
    .then((response) => response.json())
    .then((json) => {
       displayWeather(json, city)
        })
      .catch(err => console.error(err);
})
0
const displayWeather = (weatherData,city) => {
  const testCity = weatherData;
  const cityResults = document.querySelector('#city-results')
  const cityName = document.createElement('h2')
  const weatherResultList = document.createElement('ul')
  
  let location = document.querySelector("#location");
  location.addEventListener('mouseenter', (event)=>{
    location.innerHTMLvalue = ""
  });

  cityName.innerText = city;

  cityResults.append(cityName)
  
  const areaName = document.createElement('li')
  areaName.setAttribute('class','ml-35')
  let areaText = weatherData.nearest_area[0].areaName[0].value;
  areaName.innerHTML = `<strong>Region:</strong> ${areaText}`;
  weatherResultList.append(areaName)
  
  const regionName = document.createElement('li')
  regionName.setAttribute('class','ml-35');
  const regionText = weatherData.nearest_area[0].region[0].value;
  regionName.innerHTML = `<strong>Region:</strong> ${regionText}`;
  weatherResultList.append(regionName)
  
  const country = document.createElement('li')
  country.setAttribute('class','ml-35')
  let countryText =  weatherData.nearest_area[0].country[0].value;
  country.innerHTML =  `<strong> Country:</strong> ${countryText}`;
  weatherResultList.append(country);
  
  const currentTemp = document.createElement('li');
  currentTemp.setAttribute('class','ml-35')
  let feelsLikeText = weatherData.current_condition[0].FeelsLikeF;
  currentTemp.innerHTML = `<strong> Currently:</strong> Feels Like ${feelsLikeText}°F`; 
  let todayDate = document.createElement('li');
  todayDate.setAttribute('class','ml-35 font12');
  // todayDate.classList.add('class','font12');
  todayDate.innerHTML = `<strong>Today's Date: </strong>${weatherData.weather[0].date}`;
  weatherResultList.append(currentTemp);
  weatherResultList.append(todayDate);
  cityResults.append(weatherResultList);
  let prevCitySearch = city;
  let prevFeelsLike = feelsLikeText;
  showPreviousSearchItem(prevCitySearch,prevFeelsLike);

  showForecast(weatherData,city);
}

function initPreviousSearch(){
  initPrevSearchArea.innerHTML = "";
  return true;
}
const showPreviousSearchItem = (prevCitySearch,prevFeelsLike) => {
  let previousSearchDiv = document.querySelector('#previous-searches');
  if(prevHeaderH4 !== true) {
    createPrevSearchHeader(previousSearchDiv) //creates an h4 element;
  }
  
  if(prevHeaderUl !== true){
    createPrevSearchListUL(previousSearchDiv); // creates a ul element
  }
  
  createPrevListItems(previousSearchDiv,prevCitySearch, prevFeelsLike); //creates a list item
  listItemText = "";
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
    prevHeaderUl = true;
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

const showForecast = (weatherData,city) => {

  const threeDayForecast = document.querySelector('#three-day-forecast');
  let days = ['Today','Tomorrow','Day After Tomorrow'];

  /* todaySection */
    let todaySection = document.createElement('div'); //<---
    let todayName = document.createElement('h3');
    todayName.innerText = days[0];
    let todayNameUL = document.createElement('ul'); // <---
    todayNameUL.setAttribute('class', `${days[0].toLowerCase()} forecast`);
    let avgTempLi = document.createElement('li');
    avgTempLi.innerHTML = `<strong>Average Temperature:</strong> ${weatherData.weather[0].avgtempF}°F`;
    let maxTempLi = document.createElement('li');
    maxTempLi.innerHTML = `<strong>Max Temperature:</strong> ${weatherData.weather[0].maxtempF}°F`;
    let minTempLi = document.createElement('li');
    minTempLi.innerHTML = `<strong>Min Temperature:</strong> ${weatherData.weather[0].mintempF}°F`;
    let todayDate = document.createElement('li');
    todayDate.setAttribute('class', 'font12');
    todayDate.innerHTML = `<strong>Today's Date: </strong>${weatherData.weather[0].date}`;
    todayNameUL.append(avgTempLi);
    todayNameUL.append(maxTempLi);
    todayNameUL.append(minTempLi);
    todayNameUL.append(todayDate);
    todaySection.append(todayName);
    todaySection.append(todayNameUL);
    threeDayForecast.append(todaySection);
    
    /* tomorrowSection */
    let tomorrowSection = document.createElement('div'); //<---
    let tomorrowName = document.createElement('h3');
    tomorrowName.innerText = days[1];
    
    let tomorrowNameUL = document.createElement('ul'); // <---
    tomorrowNameUL.setAttribute('class', `${days[1].toLowerCase()} forecast`);

    let tomorrowAvgTempLi = document.createElement('li');
    tomorrowAvgTempLi.innerHTML = `<strong>Average Temperature:</strong> ${weatherData.weather[1].avgtempF}°F`;
    
    let tomorrowMaxTempLi = document.createElement('li');
    tomorrowMaxTempLi.innerHTML = `<strong>Max Temperature:</strong> ${weatherData.weather[1].maxtempF}°F`;
    
    let tomorrowMinTempLi = document.createElement('li');
    tomorrowMinTempLi.innerHTML = `<strong>Min Temperature:</strong> ${weatherData.weather[1].mintempF}°F`;
    
    let tomorrowDate = document.createElement('li');
    tomorrowDate.setAttribute('class','font12');
    tomorrowDate.innerHTML = `<strong>Tomorrow's Date: </strong>${weatherData.weather[1].date}`;
    
    tomorrowNameUL.append(tomorrowAvgTempLi);
    tomorrowNameUL.append(tomorrowMaxTempLi);
    tomorrowNameUL.append(tomorrowMinTempLi);
    tomorrowNameUL.append(tomorrowDate);
    tomorrowSection.append(tomorrowName);
    tomorrowSection.append(tomorrowNameUL);
    threeDayForecast.append(tomorrowSection);
    
    
    /* dayAfterTomorrowSection */
    let dayAfterTomorrowSection = document.createElement('div') //<---
    let dayAfterTomorrowName = document.createElement('h3')
    dayAfterTomorrowName.innerText = days[2]
    
    let dayAfterTomorrowNameUL = document.createElement('ul') // <---
    dayAfterTomorrowNameUL.setAttribute('class', `${days[2].toLowerCase()} forecast`)
    
    let dayAfterTomorrowAvgTempLi = document.createElement('li')
    dayAfterTomorrowAvgTempLi.innerHTML = `<strong>Average Temperature:</strong> ${weatherData.weather[2].avgtempF}°F`
    
    let dayAfterTomorrowMaxTempLi = document.createElement('li')
    dayAfterTomorrowMaxTempLi.innerHTML = `<strong>Max Temperature:</strong> ${weatherData.weather[2].maxtempF}°F`
    
    let dayAfterTomorrowMinTempLi = document.createElement('li')
    dayAfterTomorrowMinTempLi.innerHTML = `<strong>Min Temperature:</strong> ${weatherData.weather[2].mintempF}°F`
    
    let dayAfterTomorrowDate = document.createElement('li')
    dayAfterTomorrowDate.setAttribute('class','font12');
    dayAfterTomorrowDate.innerHTML = `<strong>Day After Tomorrow's: </strong>${weatherData.weather[2].date}`
    
    dayAfterTomorrowNameUL.append(dayAfterTomorrowAvgTempLi)
    dayAfterTomorrowNameUL.append(dayAfterTomorrowMaxTempLi)
    dayAfterTomorrowNameUL.append(dayAfterTomorrowMinTempLi)
    dayAfterTomorrowNameUL.append(dayAfterTomorrowDate)
    dayAfterTomorrowSection.append(dayAfterTomorrowName)
    dayAfterTomorrowSection.append(dayAfterTomorrowNameUL)
    threeDayForecast.append(dayAfterTomorrowSection);

}
