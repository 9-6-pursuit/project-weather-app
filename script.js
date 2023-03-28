const form  = document.querySelector("form")
const BASE_URL = "https://wttr.in/"

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    let input = document.querySelector(".input1").value;

    let url = BASE_URL + input + "?format=j1"

    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        displayCard(json)
    }).catch(displayError);
})

  
let body = document.querySelector("body")

function displayCard(json){
    console.log(json)
    // let areaObj = {json}
    // console.log({json})
        // if (!areaObj){
        let areaName = json.nearest_area[0].areaName[0].value
        let regionName = json.nearest_area[0].region[0].value
        let countryName = json.nearest_area[0].country[0].value
        let currentlyName = json.current_condition
        [0].FeelsLikeF
        let sunshineName = json.weather[0].hourly[0].chanceofsunshine
        let rainName = json.weather[0].hourly[0].chanceofrain
        let snowName = json.weather[0].hourly[0].chanceofsnow
        
        //Giph if else
        
        // area name, giph, area, region, country, currently, chance of sunshine
        let divWeatherBox = document.querySelector(".weather-box")
        let title = document.querySelector(".title")
        title.textContent = areaName
        
        let weatherReport = document.createElement("ul")
        weatherReport.setAttribute("class", "weather-list")

        let locationItem = document.createElement("li")
        locationItem.textContent = `Area: ${areaName}`

        let regionItem = document.createElement("li")
        regionItem.textContent = `Region: ${regionName}`
        
        let countryItem = document.createElement("li")
        countryItem.textContent = `Country: ${countryName}`
        
        let currentlyItem = document.createElement("li")
        currentlyItem.textContent = `Currently: Feels like ${currentlyName}°F`
        
        let sunshineItem = document.createElement("li")
        sunshineItem.textContent = `Chance Of Sunshine: ${sunshineName}%`
        
        let rainItem = document.createElement("li")
        rainItem.textContent = `Chance Of Rain: ${rainName}%`
        
        let snowItem = document.createElement("li")
        snowItem.textContent = `Chance Of Snow: ${snowName}%`


        weatherReport.append(locationItem)
        weatherReport.append(regionItem)
        weatherReport.append(countryItem)
        weatherReport.append(currentlyItem)
        weatherReport.append(sunshineItem)
        weatherReport.append(rainItem)
        weatherReport.append(snowItem)
        divWeatherBox.append(weatherReport)

        let descOfWeather = json.current_condition
        [0].weatherDesc[0].value

        if (descOfWeather === "Overcast") {
                let weatherImg = document.createElement("img")
                weatherImg.setAttribute("src", "./assets/icons8-night.gif")
                divWeatherBox.prepend(weatherImg)
            }

    // }else {
    //     areaName = json.nearest_area[0].areaName[0].value
    //     // area name, giph, area, region, country, currently, chance of sunshine
    //     let divWeatherBox = document.querySelector(".weather-box")
    //     let title = document.querySelector(".title")
    //     title.textContent = areaName
        
    //     let weatherReport = document.createElement("ul")
    //     weatherReport.setAttribute("class", "weather-list")

    //     let locationItem = document.createElement("li")
    //     locationItem.textContent = `Area : ${areaName}`

    //     let regionItem = document.createElement("li")
    //     regionItem.textContent = `Region : ${0}`
        
    //     let countryItem = document.createElement("li")
    //     countryItem.textContent = `Country : ${0}`
        
    //     let currentlyItem = document.createElement("li")
    //     currentlyItem.textContent = `Currently : ${0}`
        
    //     let chanceItem = document.createElement("li")
    //     chanceItem.textContent = `Chance Of Sunshine : ${0}`
    // }

}
// --------------------------------------
function displayError(error) {
    console.log(error)
    
    let footer = document.createElement("footer")
    body.append(footer)

    body.style.display = "block";
  
    const paragraph = document.createElement("p");
    paragraph.textContent = "Something went wrong!";
  
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = error;
  
    body.append(paragraph, errorMessage);
}