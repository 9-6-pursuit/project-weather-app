
// let location = document.getElementById("location")
// const current  = document.querySelector(".current")
// let searchBox = document.querySelector(".search")

// function fetchWeather(city) {
//     let promise = fetch(`https://wttr.in/${city}?format=j1`)
//     promise.then(response => {
//         return response.json()
//     }).then(result => {
//         fillWeatherBox(json, city)
//     }).catch(error => console.error(error))

// }


let form = document.querySelector(".search")
const outputData = document.querySelector(".output")
let cityInput = document.getElementById("location-input")

let button = document.querySelector(".button")


// Fetch data
function fetchWeatherData(cityName) {

    let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`)
    receivedPromise.then(response => {
        return response.json()
    }).then(json => {
        fillWeatherBox(json, cityName)
        console.log(json)
    }).catch(error => console.error(error))

}


// Get city input
button.addEventListener("click", event => {
    event.preventDefault()
    let cityName = ""
   
      cityName = cityInput.value
    
    
    fetchWeatherData(cityName)
})

// Output result
const fillWeatherBox = (json, cityName) => {
    outputData.innerHTML = ""

    let label = document.createElement("h4")
    label.textContent = cityName
    outputData.append(label)

    let areaName = json.nearest_area[0].areaName[0].value
    let area = document.createElement("li")
    area.classList.add("weather-info-list")
    area.innerHTML = `<strong>Area:</strong> ${areaName}`
    outputData.append(area)

    let regionName = json.nearest_area[0].region[0].value
    let region = document.createElement("li")
    region.classList.add("weather-info-list")
    region.innerHTML = `<strong>Region:</strong> ${regionName}`
    outputData.append(region)

    let countryName = json.nearest_area[0].country[0].value
    let country = document.createElement("li")
    country.classList.add("weather-info-list")
    country.innerHTML = `<strong>Country:</strong> ${countryName}`
    outputData.append(country)

    let temperatureValue = json.current_condition[0].FeelsLikeF
    temperature = document.createElement("li")
    temperature.classList.add("weather-info-list")
    temperature.innerHTML = `<strong>Currently:</strong> Feels like ${temperatureValue}°F`
    outputData.append(temperature)

}

