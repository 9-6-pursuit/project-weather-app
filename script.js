const form  = document.querySelector("form")
const BASE_URL = "https://wttr.in/"
const body = document.querySelector("body")


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


function displayCard(json){
    
    console.log(json)
        let areaName = json.nearest_area[0].areaName[0].value
        let regionName = json.nearest_area[0].region[0].value
        let countryName = json.nearest_area[0].country[0].value
        let currentlyName = json.current_condition
        [0].FeelsLikeF
        let sunshineName = json.weather[0].hourly[0].chanceofsunshine
        let rainName = json.weather[0].hourly[0].chanceofrain
        let snowName = json.weather[0].hourly[0].chanceofsnow
        
        // Body targeting
        let pageContainerSection = document.querySelector(".page-container")

        let divWeatherBox = document.querySelector(".weather-box")
        let title = document.querySelector(".title")
        title.textContent = areaName
        
        let weatherReport = document.createElement("ul")
        weatherReport.setAttribute("class", "weather-list")

        
        // area name, giph, area, region, country, currently, chance of sunshine

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

    // created foot section for 3 day forecast
        let footer = document.createElement("footer")
        pageContainerSection.append(footer)
        
        let foot1 = document.createElement("div")
        footer.append(foot1)
        foot1.setAttribute("class", "1days-forecast")
        let header1 = document.createElement("h1")
        foot1.append(header1)
        
        let foot2 = document.createElement("div")
        footer.append(foot2)
        foot2.setAttribute("class", "2days-forecast")
        let header2 = document.createElement("h1")
        foot2.append(header2)
        
        let foot3 = document.createElement("div")
        footer.append(foot3)
        foot3.setAttribute("class", "3days-forecast");        let header3 = document.createElement("h1")
        foot3.append(header3)
    // 
        

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