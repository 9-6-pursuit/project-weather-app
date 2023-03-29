//This is to make sure the JS file is linked to the HTML.
// console.log("hello world") 

const weatherBox = document.getElementById("weather-box")
const cityNameInput = document.getElementById("city-name-input")
const searchButton = document.getElementById("search-button")

searchButton.addEventListener("click", event => {
    let cityName = cityNameInput.value
    cityNameInput.value = ""

    let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`) //retrieving data from API

    receivedPromise.then(response => {
        return response.json()
    }).then(json => {
        fillWeatherBox(json, cityName)
    })    
})


const fillWeatherBox = (json, cityName) => {
    weatherBox.innerHTML = '' //clears whatever is in the weather-box.
    // window.montreal = json //displays array in the console.
    
    let label = document.createElement("h3") //Creates a new element.
    label.textContent = cityName
    weatherBox.append(label) //. append adds the label to the weather box.
    
    let areaName = json.nearest_area[0].areaName[0].value
    let area = document.createElement("li")
    area.className = `weather-box-item` //adds a class name so this can be styled in css.
    area.innerHTML = `<strong>Area:</strong> ${areaName}`
    weatherBox.append(area)
    
    let regionName = json.nearest_region[0].regionName[0].value
    let region = document.createElement("li")
    region.className = `weather-box-item` //adds a class name so this can be styled in css.
    region.innerHTML = `<strong>region:</strong> ${regionName}`
    weatherBox.append(region)
    
    let countryName = json.nearest_country[0].countryName[0].value
    let country = document.createElement("li")
    country.className = `weather-box-item` //adds a class name so this can be styled in css.
    country.innerHTML = `<strong>country:</strong> ${countryName}`
    weatherBox.append(country)
    
    let tempValue = json.current_condition[0].FeelsLikeF
    let temp = document.createElement("li")
    temp.className = `weather-box-item` //adds a class name so this can be styled in css.
    temp.innerHTML = `<strong>Currently:</strong> Feels like ${tempValue}°F` 
    weatherBox.append(temp)


    



    // console.log(json)
}

