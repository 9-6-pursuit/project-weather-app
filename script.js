const weatherBox = document.getElementById("weather-box")
const cityNameInput = document.getElementById("city-name-input")
const searchButton = document.getElementById("search-button")
const mainBody = document.getElementById("daBody")
const div1 = document.createElement("divOne")
div1.className = "wats-in-the-box"
mainBody.append(div1)
const div2 = document.createElement("divTwo")
div2.className = "wats-in-the-box"
mainBody.append(div2)
const div3 = document.createElement("divThree")
div3.className = "wats-in-the-box"
mainBody.append(div3)

searchButton.addEventListener("click", event => {
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

    let today = document.createElement("ul") //starts here
    today.innerHTML = `<strong>Today</strong>`
    div1.append(today)

   let todayAvrgTempValue = json.weather[0].avgtempF
   let todayAvrgTemp = document.createElement("ul")
   todayAvrgTemp.className = "threeDays"
   todayAvrgTemp.innerHTML = `<strong>Average Temperature:</strong> ${todayAvrgTempValue}°F`
   div1.append(todayAvrgTemp)
    console.log(todayAvrgTempValue)

   let todayMaxTempValue = json.weather[0].maxtempF
   let todayMaxTemp = document.createElement("ul")
   todayMaxTemp.className = "threeDays"
   todayMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${todayMaxTempValue}°F`
   div1.append(todayMaxTemp)
    console.log(todayMaxTempValue)

   let todayMinTempValue = json.weather[0].mintempF
   let todayMinTemp = document.createElement("ul")
   todayMinTemp.className = "threeDays"
   todayMinTemp.innerHTML = `<strong>Min Temperature:</strong> ${todayMinTempValue}°F`
   div1.append(todayMinTemp)
    console.log(todayMinTempValue) //ends here

    let tomorrow = document.createElement("ul")
    tomorrow.innerHTML = `<strong>Tomorrow</strong>`
    div2.append(tomorrow)

   let tomorrowAvrgTempValue = json.weather[1].avgtempF
   let tomorrowAvrgTemp = document.createElement("ul")
   tomorrowAvrgTemp.className = "threeDays"
   tomorrowAvrgTemp.innerHTML = `<strong>Average Temperature:</strong> ${tomorrowAvrgTempValue}°F`
   div2.append(tomorrowAvrgTemp)
    console.log(tomorrowAvrgTempValue)

   let tomorrowMaxTempValue = json.weather[1].maxtempF
   let tomorrowMaxTemp = document.createElement("ul")
   tomorrowMaxTemp.className = "threeDays"
   tomorrowMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${tomorrowMaxTempValue}°F`
   div2.append(tomorrowMaxTemp)
    console.log(tomorrowMaxTempValue)

   let tomorrowMinTempValue = json.weather[1].mintempF
   let tomorrowMinTemp = document.createElement("ul")
   tomorrowMinTemp.className = "threeDays"
   tomorrowMinTemp.innerHTML = `<strong>Min Temperature:</strong> ${tomorrowMinTempValue}°F`
   div2.append(tomorrowMinTemp)
    console.log(tomorrowMinTempValue) //Ends here

    let afterTomorrow = document.createElement("ul")
    afterTomorrow.innerHTML = `<strong>Day After Tomorrow</strong>`
    div3.append(afterTomorrow)

   let afterTomorrowAvrgTempValue = json.weather[2].avgtempF
   let afterTomorrowAvrgTemp = document.createElement("ul")
   afterTomorrowAvrgTemp.className = "threeDays"
   afterTomorrowAvrgTemp.innerHTML = `<strong>Average Temperature:</strong> ${afterTomorrowAvrgTempValue}°F`
   div3.append(afterTomorrowAvrgTemp)
    console.log(afterTomorrowAvrgTempValue)

   let afterTomorrowMaxTempValue = json.weather[2].maxtempF
   let afterTomorrowMaxTemp = document.createElement("ul")
   afterTomorrowMaxTemp.className = "threeDays"
   afterTomorrowMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${afterTomorrowMaxTempValue}°F`
   div3.append(afterTomorrowMaxTemp)
    console.log(afterTomorrowMaxTempValue)

   let afterTomorrowMinTempValue = json.weather[2].mintempF
   let afterTomorrowMinTemp = document.createElement("ul")
   afterTomorrowMinTemp.className = "threeDays"
   afterTomorrowMinTemp.innerHTML = `<strong>Min Temperature:</strong> ${afterTomorrowMinTempValue}°F`
   div3.append(afterTomorrowMinTemp)
    console.log(afterTomorrowMinTempValue)

}