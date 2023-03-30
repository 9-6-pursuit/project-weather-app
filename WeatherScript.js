//console.log(fetchResult); when we console.log the fetchResult we get a promise

//Let's reference some HTML DOM Elements:
const weatherBox = document.querySelector('.weather-box');
const currentLocation = document.querySelector('#current-weather');
const form = document.getElementById('search-form');
const input = document.getElementById('search-term');
const searchButton = document.getElementById("search-button");

//we are going to create a code that will give weather info only when the user clicks the searchButton

searchButton.addEventListener("click", event => {
    let cityName = input.value;
    event.preventDefault()
//do fetch (GET) to get the API for the Bronx to see how it works
    let fetchResult = fetch(`https://wttr.in/${cityName}?format=j1`); //remember to put the URL in quotes because it is read as a string

//Since fetchResult is a promise we can use the .then method as follows:
    fetchResult.then(response => {
    return response.json()//when we do this we are requesting the promise in the form of a JSON, which will give us a second promise but in the form of a JSON
        }).then(json => {
            weatherInfo(json, cityName);//because the above, reponse.json, is also a promise we can do another .then fxn as you see here. This .then is will show us the weather and conditions of the 2nd promise
        })
})


//here we defined a fxn called weatherInfo that is a JSON with weather information for the selected location; we will use this information to fill our weather articles in the HTML 
const weatherInfo = (json, cityName) => {
    weatherBox.innerHTML =''

    let label= document.createElement('h3');
    label.textContent = cityName;
    weatherBox.append(label);

    let areaName = json.nearest_area[0].areaName[0].value;
    let area = document.createElement('li');
    area.className = 'weather-box-item';
    area.innerHTML = `<strong>Area:</strong> ${areaName}`;
    weatherBox.append(area);
    
    let regionName = json.nearest_area[0].region[0].value;
    let region = document.createElement('li');
    region.className = 'weather-box-item';
    region.innerHTML = `<strong>Region:</strong> ${regionName}`;
    weatherBox.append(region);

    let countryName = json.nearest_area[0].country[0].value;
    let country = document.createElement('li');
    country.className = 'weather-box-item';
    country.innerHTML = `<strong>Country:</strong> ${countryName}`;
    weatherBox.append(country);

    let tempValue = json.current_condition[0].FeelsLikeF;
    let temperature = document.createElement('li');
    temperature.className = 'weather-box-item';
    temperature.innerHTML = `<strong>Currently:</strong> Feels like ${tempValue}°F`;
    weatherBox.append(temperature);
}   