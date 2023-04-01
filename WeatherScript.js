//console.log(fetchResult); when we console.log the fetchResult we get a promise

//Let's reference some HTML DOM Elements:
const weatherBox = document.querySelector('.weather-box');
const currentLocation = document.querySelector('#current-weather');
const form = document.getElementById('search-form');
const input = document.getElementById('search-term');
const searchButton = document.getElementById("search-button");
const searchHistoryDefault = document.querySelector(".search-history-default");
const searchHistoryLinks = document.querySelector(".search-history");
const currentConditionImg = document.querySelectorAll(".img-duplicate");
const currentCondition = document.querySelectorAll(".current-conditions");
const img = document.querySelectorAll(".img");
const currTempHeading = document.querySelector('.current-temp');
const followingTemp = document.querySelectorAll(".following-temp");
const locationHeading = document.querySelectorAll(".location");
const headingDate = document.querySelectorAll(".heading-date");
const conditions = document.querySelectorAll(".conditions"); 

//this fxn will capitalize the first letter in each word of the city or town
const capitalizeCityName = (cityName) => {
    return cityName.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

//we are going to create a code that will give weather info only when the user clicks the searchButton
searchButton.addEventListener("click", event => {
    event.preventDefault();

    let cityName = input.value;

    cityName = capitalizeCityName(cityName);

//do fetch (GET) to get the API for the Bronx to see how it works
    let fetchResult = fetch(`https://wttr.in/${cityName}?format=j1`); //remember to put the URL in quotes because it is read as a string

//Since fetchResult is a promise we can use the .then method as follows:
    fetchResult.then(response => {
    return response.json() //when we do this we are requesting the promise in the form of a data, which will give us a second promise but in the form of a data
        }).then(json => {
            weatherInfo(json, cityName);//because the above, reponse.json, is also a promise we can do another .then fxn as you see here. This .then is will show us the weather and conditions of the 2nd promise
        })
        console.log(fetchResult);
})

//here we defined a fxn called weatherInfo that is a data with weather information for the selected location; we will use this information to fill our weather articles in the HTML 
const weatherInfo = (data, cityName) => {
    weatherBox.innerHTML = '';

    console.log(data);

    weatherBox.append(currentConditionImg[0])

//creating a heading in font size 3 for our cityName with the value of the City 
    let label= document.createElement('h3');
    label.textContent = cityName;
    weatherBox.append(label);

//nearest area as per data data
    let areaName = data.nearest_area[0].areaName[0].value;
    let area = document.createElement('li');
    area.className = 'weather-box-item';
    area.innerHTML = `<strong>Area:</strong> ${areaName}`;
    weatherBox.append(area);

//region of city or area as per data data
    let regionName = data.nearest_area[0].region[0].value;
    let region = document.createElement('li');
    region.className = 'weather-box-item';
    region.innerHTML = `<strong>Region:</strong> ${regionName}`;
    weatherBox.append(region);

//country that city or area is located as per data data
    let countryName = data.nearest_area[0].country[0].value;
    let country = document.createElement('li');
    country.className = 'weather-box-item';
    country.innerHTML = `<strong>Country:</strong> ${countryName}`;
    weatherBox.append(country);

//current temperature of the inputted city/area as per data data
    let currTemp = data.current_condition[0].temp_F;
    let temperature = document.createElement('li');
    temperature.className = 'weather-box-item';
    temperature.innerHTML = `<strong>Currently:</strong> ${currTemp}°F`;
    weatherBox.append(temperature);

//what it feels like compared to the actual temperature    
    let feelsLike = data.current_condition[0].FeelsLikeF;
    let feelsLikeList = document.createElement('li');
    feelsLikeList.className = 'weather-box-item';
    feelsLikeList.innerHTML = `<strong>Feels like:</strong> ${feelsLike}°F`;
    weatherBox.append(feelsLikeList);

//fxn inside of a fxn- this fxn will add our previous searches to the Previous searches column
    addToPreviousBox(data, cityName);

    currWeatherImages(data);

    otherWeatherImages(data);

    threeDayOverview(data);
}   


let addToPreviousBox = (data, cityName) => {
    if(searchHistoryDefault) {
        searchHistoryDefault.remove();
    }
    let searchItem = document.createElement('li');
    let name = document.createElement('a');
    name.textContent = cityName; // adds the city name to our url (a tag)
    name.href = '#';
    searchItem.append(name);
    searchItem.innerHTML += ` - ${data.current_condition[0].temp_F}°F`; // it is important to use innerHTML here and NOT textContent because textContent will remove the a tags and we need that (in addition to '#') to make our hyperlink appear on the webpage
    searchHistoryLinks.append(searchItem);
}


//here I am making a fxn for the images; images will correspond to weather conditions in the JSON 
const currWeatherImages = (data) => {
    let currentWeather = data.current_condition[0].weatherDesc[0].value;
    let location = data.nearest_area[0].areaName[0].value + ", " +  data.nearest_area[0].region[0].value;
    let date = new Date(data.weather[0].date).toDateString();

    for (const currWeatherImage of currentConditionImg) {
        switch(currentWeather) {
            case "Overcast":
            case "Cloudy":
                currWeatherImage.src = "assets/icon8-cloudy.svg"
                currWeatherImage.alt = "cloudy"
                break;
            case "Partly cloudy":
                currWeatherImage.src = "assets/icon8-partly-cloudy.svg"
                currWeatherImage.alt = "partly cloudy"
                break;
            case "Sunny":
            case "Clear":
                currWeatherImage.src = "assets/icon8-sunny.svg"
                currWeatherImage.alt = "clear skies"
                break;
            case "Rain":
            case "Rainy":
            case "Light drizzle": 
                currWeatherImage.src = "assets/icon8-rain.svg"
                currWeatherImage.alt = "rain"
                break;
        }
        console.log(currWeatherImage);
        headingDate[0].innerHTML = `Today, ${date}`;
        let currTemp = data.current_condition[0].temp_F;
        currTempHeading.innerHTML = `${currTemp}°F`;
        currentCondition[1].innerHTML = data.current_condition[0].weatherDesc[0].value;
        locationHeading[0].innerHTML = location
    } 
    currentCondition[0].prepend(currentConditionImg[1])
}
// here I am using the JSON information to access the weather conditions at 12:00pm (noon); this info is located in the hourly array#4 - the image will reflect the weather condition at noon
const otherWeatherImages = (data) => {
    let indexCounter = 1; 
    for (const image of img) {
        let weatherImg = data.weather[indexCounter].hourly[4].weatherDesc[0].value;

        indexCounter += 1

        switch(weatherImg) {
            case "Overcast":
            case "Cloudy":
                image.src = "assets/icon8-cloudy.svg";
                image.alt = "cloudy";
                break;
            case "Partly cloudy":
                image.src = "assets/icon8-partly-cloudy.svg";
                image.alt = "partly cloudy";
                break;
            case "Sunny":
            case "Clear":
                image.src = "assets/icon8-sunny.svg";
                image.alt = "clear skies";
                break;
            case "Rain":
            case "Rainy":
            case "Light drizzle": 
                image.src = "assets/icons8-rain.svg";
                image.alt = "rain";
                break;
        }
        console.log(image);
        console.log(indexCounter);
        console.log(weatherImg);
    } 
}

//fxn to display information for the 3 days worth of weather information - includes current day
const threeDayOverview = (data) => {
    let location = data.nearest_area[0].areaName[0].value + ", " +  data.nearest_area[0].region[0].value;
    let date1 = new Date(data.weather[1].date).toDateString()
    let date2 = new Date(data.weather[2].date).toDateString()

    headingDate[1].innerHTML = `Tomorrow, ${date1}` ;
    followingTemp[0].innerHTML = data.weather[1].avgtempF + "°F";
    conditions[0].innerHTML = data.weather[1].hourly[4].weatherDesc[0].value;
    locationHeading[1].innerHTML = location;

    headingDate[2].innerHTML = `Day After Tomorrow, ${date2}`;
    followingTemp[1].innerHTML = data.weather[2].avgtempF + "°F";
    conditions[1].innerHTML = data.weather[2].hourly[4].weatherDesc[0].value;
    locationHeading[2].innerHTML = location;

    console.log(conditions[1].innerHTML);
    console.log(conditions[0].innerHTML);
}
    