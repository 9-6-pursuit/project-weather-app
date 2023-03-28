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

    //Convert temperature section inputs
        
        





    // area name, giph, area, region, country, currently, chance of sunshine
        let descOfWeather = json.current_condition
        [0].weatherDesc[0].value
        if (descOfWeather === "Overcast") {
                let weatherImg = document.createElement("img")
                weatherImg.setAttribute("src", "./assets/icons8-night.gif")
                divWeatherBox.prepend(weatherImg)
            }
        
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
    // Previous Searches section... probably need an array of sorts log h1 if h1 not available, add to list




    
    // created foot section for 3 day forecast
    let footer = document.createElement("footer")
    pageContainerSection.append(footer)
    
    //foot div 1

        let foot1 = document.createElement("div")
        footer.append(foot1)
        foot1.setAttribute("class", "days-forecast weather-box")
        
        let header1 = document.createElement("h1")
        foot1.append(header1)
        header1.textContent = "Today"


        let avgTemp1val = json.weather[0].avgtempF
        let avgTemp1 = document.createElement("li")
        foot1.append(avgTemp1)
        avgTemp1.textContent = `Average Temperature: ${avgTemp1val}°F`

        let minTemp1val = json.weather[0].mintempF
        let minTemp1 = document.createElement("li")
        foot1.append(minTemp1)
        minTemp1.textContent = `Minimum Temperature: ${minTemp1val}°F`
        
        let maxTemp1val = json.weather[0].maxtempF
        let maxTemp1 = document.createElement("li")
        foot1.append(maxTemp1)
        maxTemp1.textContent = `Maximum Temperature: ${maxTemp1val}°F`

    //foot div 2

        let foot2 = document.createElement("div")
        footer.append(foot2)
        foot2.setAttribute("class", "days-forecast weather-box")

        let header2 = document.createElement("h1")
        foot2.append(header2)
        header2.textContent = "Tomorrow"

        let avgTemp2val = json.weather[1].avgtempF
        let avgTemp2 = document.createElement("li")
        foot2.append(avgTemp2)
        avgTemp2.textContent = `Average Temperature: ${avgTemp2val}°F`

        let minTemp2val = json.weather[1].mintempF
        let minTemp2 = document.createElement("li")
        foot2.append(minTemp2)
        minTemp2.textContent = `Minimum Temperature: ${minTemp2val}°F`

        let maxTemp2val = json.weather[1].maxtempF
        let maxTemp2 = document.createElement("li")
        foot2.append(maxTemp2)
        maxTemp2.textContent = `Maximum Temperature: ${maxTemp2val}°F`



    //foot div 3

        let foot3 = document.createElement("div")
        footer.append(foot3)
        foot3.setAttribute("class", "days-forecast weather-box")

        let header3 = document.createElement("h1")
        foot3.append(header3)
        header3.textContent = "Day After Tomorrow"

        let avgTemp3val = json.weather[2].avgtempF
        let avgTemp3 = document.createElement("li")
        foot3.append(avgTemp3)
        avgTemp3.textContent = `Average Temperature: ${avgTemp3val}°F`
        
        
        let minTemp3val = json.weather[2].mintempF
        let minTemp3 = document.createElement("li")
        foot3.append(minTemp3)
        minTemp3.textContent = `Minimum Temperature: ${minTemp3val}°F`
        
        let maxTemp3val = json.weather[2].maxtempF
        let maxTemp3 = document.createElement("li")
        foot3.append(maxTemp3)
        maxTemp3.textContent = `Maximum Temperature: ${maxTemp3val}°F`

        

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