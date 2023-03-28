console.log("Here is the weather")

const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let location = document.querySelector("#input").value
    let weather = "https://wttr.in/" + location + "?format=j1";
 
    
    fetch(weather)
    .then((response) => response.json())
    .then((json)=> {
        console.log(json.nearest_area[0].areaName[0].value)
  console.log(weather)
   let weatherBox = document.querySelector("div .weather-box")
   weatherBox.textContent = ""
    
    let label = document.createElement("h3")
    label.textContent = location
    weatherBox.append(label)

    let areaName = json.nearest_area[0].areaName[0].value
    let area = document.createElement("li")
    area.className = "weather-box-item"
    area.innerHTML = `<strong>Area:</strong>${areaName}`
    weatherBox.append(area)
    
    let regionName = json.nearest_area[0].region[0].value
    let region = document.createElement("li")
    region.className = "weather-box-item"
    region.innerHTML = `<strong>Region:</strong>${regionName}`
    weatherBox.append(region)

    let countryName = json.nearest_area[0].country[0].value
    let country = document.createElement("li")
    country.className = "weather-box-item"
    country.innerHTML = `<strong>Country:</strong>${countryName}`
    weatherBox.append(country)

    let tempValue = json.current_condition[0].FeelsLikeF
    let temperature = document.createElement("li")
    temperature.className = "weather-box-item"
    temperature.innerHTML = `<strong>Currently:</strong>${tempValue} °F`
    weatherBox.append(temperature)

    let chanceOfRain = json.weather[0].hourly[0].chanceofrain
    let rain = document.createElement("li")
    rain.className = "weather-box-item"
    rain.innerHTML = `<strong>Chance of Rain:</strong>${chanceOfRain}`
    weatherBox.append(rain)

    let chanceOfSnow = json.weather[0].hourly[0].chanceofsnow
    let snow = document.createElement("li")
    temperature.className = "weather-box-item"
    temperature.innerHTML = `<strong>Chance of Snow:</strong>${chanceOfSnow}`
    weatherBox.append(snow)

      const today = document.querySelector(".today h3");
    
      const paraToday = document.createElement("p");
      const todayAvg = weather.weather[0].avgtempF;
      paraToday.textContent =" Average Tempeture:  "+ todayAvg;
      today.append(paraToday);

      const todayMax = document.createElement("p");
      const maxTemp = weather.weather[0].maxtempF;
      todayMax.textContent = ` Max Temperture:` + maxTemp;
      today.append(todayMax);

      todayMin = document.createElement("p");
      const minTemp = weather.weather[0].mintempF;
      todayMin.textContent = ` Min Temperture:` + minTemp;
      today.append(todayMin);

  
console.log(todayMin)
    })
    .catch((error) => {


    })


})