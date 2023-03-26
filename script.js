const weatherBox = document.querySelector("#weather-data")
let cityNameInput = document.getElementById("city-input")
let button = document.getElementById("search-button")
button.addEventListener("click", event => {
    let cityName = cityNameInput.value
    cityNameInput.value = ""


    // fetch(`https://wttr.in/${cityName}?format=j1`)
    //     .then(response => response.json())
    //     .then(json => fillWeatherBox(json, cityName))
    //     .catch(error => console.error(error))

let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`)
receivedPromise.then(response => {
    return response.json()
}).then(json => {
    fillWeatherBox(json, cityName)
}).catch(error => console.error(error))
})

const fillWeatherBox = (json, cityName) => {
    weatherBox.innerHTML = ""
    // window.cityName = json

    let label = document.createElement("h3")
    label.textContent = cityName
    weatherBox.append(label)

    let areaName = json.nearest_area[0].areaName[0].value
    let area = document.createElement("li")
    area.innerHTML = `<strong>Area:</strong> ${areaName}`
    weatherBox.append(area)

    let regionName = json.nearest_area[0].region[0].value
    let region = document.createElement("li")
    region.innerHTML = `<strong>Region:</strong> ${regionName}`
    weatherBox.append(region)

    let countryName = json.nearest_area[0].country[0].value
    let country = document.createElement("li")
    country.innerHTML = `<strong>Country:</strong> ${countryName}`
    weatherBox.append(country)

    let temperatureValue = json.current_condition[0].FeelsLikeF
    temperature = document.createElement("li")
    temperature.innerHTML = `<strong>Currently:</strong> Feels like ${temperatureValue}`
    weatherBox.append(temperature)


}

