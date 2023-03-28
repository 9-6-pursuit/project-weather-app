const weatherBox = document.getElementById("weather-box")
const cityNameInput = document.getElementById("city-name-input")
const searchButton = document.getElementById("search-button")
const mainBody = document.getElementById("daBody")
const previousBox = document.getElementById("previous-search-list")

const todayBox = document.getElementById("todayBox")
const tomorrowBox = document.getElementById("tomorrowBox")
const afterTomorrowBox = document.getElementById("afterTomorrowBox")

searchButton.addEventListener("click", (event) => {
    let cityName = cityNameInput.value
    cityNameInput.value = ""
    
    let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`)

    receivedPromise.then(response => {
        return response.json()
    }).then(json => {
        fillWeatherBox(json, cityName)
    })
})

const fillWeatherBox = (json, cityName) => {
    weatherBox.innerHTML = ""

    let label = document.createElement('h3')
    label.textContent = cityName
    weatherBox.append(label)

    let areaName = json.nearest_area[0].areaName[0].value
    let area = document.createElement("li")
    area.className = `weather-box-item`
    area.innerHTML = `<strong>Area:</strong> ${areaName}`
    weatherBox.append(area)

    let regionName = json.nearest_area[0].region[0].value
    let region = document.createElement("li")
    region.className = `weather-box-item`
    region.innerHTML = `<strong>Region:</strong> ${regionName}`
    weatherBox.append(region)

    let countryName = json.nearest_area[0].country[0].value
    let country = document.createElement("li")
    country.className = `weather-box-item`
    country.innerHTML = `<strong>Country:</strong> ${countryName}`
    weatherBox.append(country)

   let temperatureValue = json.current_condition[0].FeelsLikeF
   let temperature = document.createElement("li")
   temperature.className = `weather-box-item`
   temperature.innerHTML = `<strong>Currently</strong> Feels like ${temperatureValue}°F`
   weatherBox.append(temperature)   

     let sunshineValue = json.weather[0].hourly[0].chanceofsunshine //This codes is for the sun icon
     if(sunshineValue > 50){
         let sunshine = document.createElement("img")
        sunshine.setAttribute("src","assets/icons8-summer.gif") 
        sunshine.setAttribute("alt","sun") 
        weatherBox.prepend(sunshine)
     }

     let rainValue = json.weather[0].hourly[0].chanceofrain //This code is for the rain icon
     if(rainValue > 50){
         let rain = document.createElement("img")
        rain.className = `weather-box-item`
        rain.setAttribute("src","assets/icons8-torrential-rain.gif") 
        rain.setAttribute("alt","rain") 
        weatherBox.prepend(rain)
     }

     let snowValue = json.weather[0].hourly[0].chanceofsnow  //This code is for the snow icon
     if(snowValue > 50){
         let snow = document.createElement("img")
         snow.className = `weather-box-item`
        snow.setAttribute("src","assets/icons8-light-snow.gif") 
        snow.setAttribute("alt","snow") 
        weatherBox.prepend(snow)
     }

     let removeP = document.querySelector("p")
        if (removeP) {
            removeP.remove()
             }

    let newInfo = document.createElement("li")
    newInfo.innerHTML = `${cityName} - ${temperatureValue}°F`
    previousBox.append(newInfo)

    todayBox.innerHTML = ""

    let today = document.createElement("h3") //Today starts here
    today.innerHTML = `<strong>Today</strong>`
    todayBox.append(today)

   let todayAvrgTempValue = json.weather[0].avgtempF
   let todayAvrgTemp = document.createElement("li")
   todayAvrgTemp.className = "threeDays"
   todayAvrgTemp.innerHTML = `<strong>Average Temperature:</strong> ${todayAvrgTempValue}°F`
   todayBox.append(todayAvrgTemp)

   let todayMaxTempValue = json.weather[0].maxtempF
   let todayMaxTemp = document.createElement("li")
   todayMaxTemp.className = "threeDays"
   todayMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${todayMaxTempValue}°F`
   todayBox.append(todayMaxTemp)

   let todayMinTempValue = json.weather[0].mintempF
   let todayMinTemp = document.createElement("li")
   todayMinTemp.className = "threeDays"
   todayMinTemp.innerHTML = `<strong>Min Temperature:</strong> ${todayMinTempValue}°F`
   todayBox.append(todayMinTemp) //Today ends here

    tomorrowBox.innerHTML = ""

    let tomorrow = document.createElement("h3") //Tomorrow starts here
    tomorrow.innerHTML = `<strong>Tomorrow</strong>`
    tomorrowBox.append(tomorrow)

   let tomorrowAvrgTempValue = json.weather[1].avgtempF
   let tomorrowAvrgTemp = document.createElement("li")
   tomorrowAvrgTemp.className = "threeDays"
   tomorrowAvrgTemp.innerHTML = `<strong>Average Temperature:</strong> ${tomorrowAvrgTempValue}°F`
   tomorrowBox.append(tomorrowAvrgTemp)

   let tomorrowMaxTempValue = json.weather[1].maxtempF
   let tomorrowMaxTemp = document.createElement("li")
   tomorrowMaxTemp.className = "threeDays"
   tomorrowMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${tomorrowMaxTempValue}°F`
   tomorrowBox.append(tomorrowMaxTemp)

   let tomorrowMinTempValue = json.weather[1].mintempF
   let tomorrowMinTemp = document.createElement("li")
   tomorrowMinTemp.className = "threeDays"
   tomorrowMinTemp.innerHTML = `<strong>Min Temperature:</strong> ${tomorrowMinTempValue}°F`
   tomorrowBox.append(tomorrowMinTemp) //Tomorrow Ends here

    afterTomorrowBox.innerHTML = ""

    let afterTomorrow = document.createElement("h3") //Day After Tomorrow starts here
    afterTomorrow.innerHTML = `<strong>Day After Tomorrow</strong>`
    afterTomorrowBox.append(afterTomorrow)

   let afterTomorrowAvrgTempValue = json.weather[2].avgtempF
   let afterTomorrowAvrgTemp = document.createElement("li")
   afterTomorrowAvrgTemp.className = "threeDays"
   afterTomorrowAvrgTemp.innerHTML = `<strong>Average Temperature:</strong> ${afterTomorrowAvrgTempValue}°F`
   afterTomorrowBox.append(afterTomorrowAvrgTemp)

   let afterTomorrowMaxTempValue = json.weather[2].maxtempF
   let afterTomorrowMaxTemp = document.createElement("li")
   afterTomorrowMaxTemp.className = "threeDays"
   afterTomorrowMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${afterTomorrowMaxTempValue}°F`
   afterTomorrowBox.append(afterTomorrowMaxTemp)

   let afterTomorrowMinTempValue = json.weather[2].mintempF
   let afterTomorrowMinTemp = document.createElement("li")
   afterTomorrowMinTemp.className = "threeDays"
   afterTomorrowMinTemp.innerHTML = `<strong>Min Temperature:</strong> ${afterTomorrowMinTempValue}°F`
   afterTomorrowBox.append(afterTomorrowMinTemp)//Day After Tomorrow ends here
}