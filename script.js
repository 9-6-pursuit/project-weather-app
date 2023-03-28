
let form = document.querySelector(".search-input")
const weatherBox = document.querySelector("#weather-data")
let cityNameInput = document.getElementById("city-input")

// This function is for Getting the data after receiving the city name as an argument 
function fetchWeatherData(cityName) {
    let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`)
    receivedPromise.then(response => {
        return response.json()
    }).then(json => {
        fillWeatherBox(json, cityName)
    }).catch(error => console.error(error))

     // fetch(`https://wttr.in/${cityName}?format=j1`)
    //     .then(response => response.json())
    //     .then(json => fillWeatherBox(json, cityName))
    //     .catch(error => console.error(error))


}


// This is to accept the city entered after clicking submit
form.addEventListener("submit", event => {
    event.preventDefault()
    let cityName = cityNameInput.value
    cityNameInput.value = ""
    fetchWeatherData(cityName)
})

// This section is to create the required elements for the output section
const fillWeatherBox = (json, cityName) => {
    weatherBox.innerHTML = ""

    // Geting the weather description to use it for icons
    const weatherDesc = json.current_condition[0].weatherDesc[0].value
    fillImage(weatherDesc)

    let label = document.createElement("h3")
    label.textContent = cityName
    weatherBox.append(label)

    let areaName = json.nearest_area[0].areaName[0].value
    let area = document.createElement("li")
    area.classList.add("weather-info-list")
    area.innerHTML = `<strong>Area:</strong> ${areaName}`
    weatherBox.append(area)

    let regionName = json.nearest_area[0].region[0].value
    let region = document.createElement("li")
    region.classList.add("weather-info-list")
    region.innerHTML = `<strong>Region:</strong> ${regionName}`
    weatherBox.append(region)

    let countryName = json.nearest_area[0].country[0].value
    let country = document.createElement("li")
    country.classList.add("weather-info-list")
    country.innerHTML = `<strong>Country:</strong> ${countryName}`
    weatherBox.append(country)

    let temperatureValue = json.current_condition[0].FeelsLikeF
    temperature = document.createElement("li")
    temperature.classList.add("weather-info-list")
    temperature.innerHTML = `<strong>Currently:</strong> Feels like ${temperatureValue}°F`
    weatherBox.append(temperature)

// This to get the average, max and min temperature for the days

    for (let i = 0; i < json.weather.length; i++) {
        const maxTempF = json.weather[i].maxtempF;
        const minTempF = json.weather[i].mintempF;
        const avgTempF = json.weather[i].avgtempF;
        fillDaysBox(avgTempF, maxTempF, minTempF) 
    }
    


    fillPreviousSearchBox(areaName, temperatureValue)
}

// This array to store previous search data
let previousSearchArr = []

// Function to add previous search to the previous search box
const fillPreviousSearchBox = (areaName, temperatureValue) => {

    previousSearchArr.unshift({areaName, temperatureValue})
    let previousSearch = document.querySelector(".previous-search li")
    previousSearch.innerHTML = ""
    if (previousSearchArr.length > 5) {
        previousSearchArr.pop();
      }
    previousSearchArr.forEach(search => {
        let list = document.createElement("li")
        list.style.color = "blue"
        list.style.textDecoration = "underline"
        // list.style.textDecoration("underline")
        list.innerHTML = `<li>${search.areaName}- ${search.temperatureValue}°F</li>`
        
        // add event listener to make the previous search clickable and pass the clicked city 
        list.addEventListener("click", (event) => {
            const liElement = list.querySelector("li")
            const searchedArea = liElement.textContent.split('-')[0]
            console.log(searchedArea)

            //calling fetch weather function when city name on previous search box clicked
            fetchWeatherData(searchedArea)
            
        })
        // console.log(previousSearchArr)
        previousSearch.appendChild(list)

    });

}

//Accept temp value and convert it from celsius to fahrenheit or fahrenheit to celsius

const conversionForm = document.querySelector(".conversion-form")
const conversionTemp = document.querySelector(".result")
conversionForm.addEventListener("submit", event =>{
    event.preventDefault()
    let tempValue = document.querySelector("#temperature").value
    let isCelsius = document.querySelector("#to-c").checked
    let isFahrenheit = document.querySelector("#to-f").checked
    console.log(isCelsius, isFahrenheit, Number(tempValue))
    console.log(conversionTemp.textContent)
    if (isCelsius){
        conversionTemp.textContent = `${(((tempValue - 32) * 5) / 9).toFixed(2)}°C`
    } else if (isFahrenheit) {
        conversionTemp.textContent = `${(((9/5) * tempValue) + 32).toFixed(2)}°F`    
    }

})


// This function is to append the proper icon to weather box
function fillImage(weatherDesc){
    let image = document.createElement("img")
    if(weatherDesc.toLowerCase().includes("sunny")){
        image.src = "assets/icons8-summer.gif" 
    } else if(weatherDesc.toLowerCase().includes("rain")){
        image.src = "assets/icons8-torrential-rain.gif" 

    } else if (weatherDesc.toLowerCase().includes("cloudy")){
        image.src = "assets/icons8-rain-cloud.gif" 

    } else if (weatherDesc.toLowerCase().includes("wind")) {
        image.src = "assets/icons8-wind.gif" 

    } else if (weatherDesc.toLowerCase().includes("snow")) {
        image.src = "assets/icons8-light-snow.gif" 

    } else if (weatherDesc.toLowerCase().includes("storm")) {
        image.src = "assets/icons8-storm.gif" 

    } else {
        image.src = "assets/icons8-summer.gif" 
    }
    weatherBox.append(image)
}


function fillDaysBox(avgTempF, maxTempF, minTempF) {
    let days = [
        document.querySelector(".today"),
        document.querySelector(".tomorrow"),
        document.querySelector(".day-after")
    ];
    days.forEach(day => {
        const title = day.querySelector("h4")
        let list = document.createElement("li")
        list.innerHTML = `<li><strong>Average Temperature: </strong>${avgTempF}°F</li>
                          <li><strong>Max Temperature: </strong>${maxTempF ? maxTempF + '°F' : 'N/A'}</li>
                          <li><strong>Min Temperature: </strong>${minTempF ? minTempF + '°F' : 'N/A'}</li>`;
        day.innerHTML = ''
        day.append(title, list)
    });
}