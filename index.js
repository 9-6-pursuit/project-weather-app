/* checked */

const weatherBox = document.getElementById("weather-box")
const cityNameInput = document.getElementById("city-name-input")
const searchButton = document.getElementById("search-button")

//added with Ahmad
const previousSearches = document.querySelector(".previous-searches-list")
let noSearches = document.querySelector(".no-searches")

searchButton.addEventListener("click", event => {
    event.preventDefault()
    let cityName = cityNameInput.value
//added with Ahmad
        cityNameInput.value = ""
        console.log(cityName)

    fetch(`https://wttr.in/${cityName}?format=j1`)
    .then(response => response.json())
    .then(json => {
        fillWeatherBox(json, cityName)
    })
})

const fillWeatherBox = (json, cityName) => {
    weatherBox.innerHTML = "";
    //added with Ahmad
    // console.log(weatherBox.innerHTML)

    noSearches.remove()
    if (!previousSearches.innerHTML.includes(json.nearest_area[0].areaName[0].value)) {
    previousSearches.innerHTML +=`<li> ${cityName} - ${json.current_condition[0].FeelsLikeF}°F</li>`
    }

    let label = document.createElement("h3")
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
    temperature.innerHTML = `<strong>Currently:</strong> Feels like ${temperatureValue}°F`
    weatherBox.append(temperature)
}






        
    // let days = ["Today", "Tomorrow", "Day After Tomorrow"];
    //     for (let i = 0; i < 3; i++) {
    //         let theDay = document.querySelector(`.day${i}`);
    //         theDay.innerHTML = "";

    //         let header = document.createElement("h3");
    //         header.className = "bottom-text";
    //         header.innerText = days[i];

    //         let avgTemp = document.createElement("li");
    //         avgTemp.className = "bottom-text";
    //         avgTemp.innerHTML = `<strong>Average Temperature:</strong> ${json.weather[i].avgtempF}°F`;

    //         let maxTemp = document.createElement("li");
    //         maxTemp.className = "bottom-text";
    //         maxTemp.innerHTML = `<strong>Max Temperature:</strong> ${json.weather[i].maxtempF}°F`;

    //         let minTemp = document.createElement("li");
    //         minTemp.className = "bottom-text";
    //         minTemp.innerHTML = `<strong>Average Temperature:</strong> ${json.weather[i].avgtempF}°F`;
    //         minTemp.append(header, avgTemp, maxTemp, minTemp);
        // }

// /* checked */

// const weatherBox = document.getElementById("weather-box")
// const cityNameInput = document.getElementById("city-name-input")
// const searchButton = document.getElementById("search-button")

// const previousSearches = document.querySelector(".previous-searches-list")
// const noSearches = document.querySelector(".noSearches")

// searchButton.addEventListener("click", event => {
//     let cityName = cityNameInput.value
//     if (cityNameInput.value) {
//         cityNameInput.value = ""
//         console.log(cityName)
    
//         fetch(`https://wttr.in/${cityName}?format=j1`)
//         .then(response => response.json())
//         .then(json => {
//             fillWeatherBox(json, cityName)
//         })
//     }

// })

// const fillWeatherBox = (json, cityName) => {
//     weatherBox.innerHTML = ""
//     console.log(weatherBox.innerHTML)
//     noSearches.remove()
//     if (!previousSearches.innerHTML.includes(json.nearest_area[0].areaName[0].value)) {
//         previousSearches.innerHTML +=`<li> ${cityName}</li>`
    
//         for (let i = 0; i < 3; i++) {
//             let theDay = document.querySelector(`.day${i}`);
//             theDay.innerHTML = "";

//             let header = document.createElement("h3");
//             header.className = "bottom-text";
//             header.innerText = days[i];

//             let avgTemp = document.createElement("li");
//             avgTemp.className = "bottom-text";
//             avgTemp.innerHTML = `<strong>Average Temperature:</strong> ${json.weather[i].avgtempF}°F`;

//             let maxTemp = document.createElement("li");
//             maxTemp.className = "bottom-text";
//             maxTemp.innerHTML = `<strong>Max Temperature:</strong> ${json.weather[i].maxtempF}°F`;

//             let minTemp = document.createElement("li");
//             minTemp.className = "bottom-text";
//             minTemp.innerHTML = `<strong>Average Temperature:</strong> ${json.weather[i].avgtempF}°F`;
//             minTemp.append(header, avgTemp, maxTemp, minTemp)

//             const element = array[index];
            
//         }
//     }

//     let label = document.createElement("h3")
//     label.textContent = cityName
//     weatherBox.append(label)

//     let areaName = json.nearest_area[0].areaName[0].value
//     let area = document.createElement("li")
//     area.className = `weather-box-item`
//     area.innerHTML = `<strong>Area:</strong> ${areaName}`
//     weatherBox.append(area)

//     let regionName = json.nearest_area[0].region[0].value
//     let region = document.createElement("li")
//     region.className = `weather-box-item`
//     region.innerHTML = `<strong>Region:</strong> ${regionName}`
//     weatherBox.append(region)

//     let countryName = json.nearest_area[0].country[0].value
//     let country = document.createElement("li")
//     country.className = `weather-box-item`
//     country.innerHTML = `<strong>Country:</strong> ${countryName}`
//     weatherBox.append(country)

//     let temperatureValue = json.current_condition[0].FeelsLikeF
//     let temperature = document.createElement("li")
//     temperature.className = `weather-box-item`
//     temperature.innerHTML = `<strong>Currently:</strong> Feels like ${temperatureValue}°F`
//     weatherBox.append(temperature)
// }



// //let area = 
