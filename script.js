let submit = document.getElementById("submit-button")

let info = {}

let list = document.getElementById('upper-text-items')

let oldSearch = document.getElementById('previous-search-box')

let textBox = document.querySelector("input")

let weatherList = document.getElementById("weather-box-list")

let days = document.getElementsByClassName("days-box")[0].querySelectorAll("ul")



submit.onclick = function() {
    fetch(`https://wttr.in/${textBox.value.split(" ").join()}?format=j1`)
    .then((reponse) => reponse.json())
    .then((json) => {
        // You can do what you like with the result here.
        info = json
              
        
        for (let d = 0; d < days.length; d++) {
            days[d].querySelectorAll("li")[0].innerHTML = "<b>Average Temperature:</b> " + info.weather[d].avgtempF + "°F"
            days[d].querySelectorAll("li")[1].innerHTML = "<b>Max Temperature:<b> " + info.weather[d].maxtempF + "°F"
            days[d].querySelectorAll("li")[2].innerHTML = "<b>Min Temperature:<b> " + info.weather[d].mintempF + "°F"
            
            
    }

    console.log(list.value)
    if(list.value) {
    const lastSearch = document.createElement('li')
    lastSearch.textContent = list.value
    console.log("worked!")
    oldSearch.append(lastSearch)
     }
    
    weatherList.querySelectorAll("li")[0].innerHTML = "<b>Area:<b> " + info.nearest_area[0].areaName[0].value
    weatherList.querySelectorAll("li")[1].innerHTML = "<b>Region:<b>" + " " +  info.nearest_area[0].region[0].value
    weatherList.querySelectorAll("li")[2].innerHTML = "<b>Country:<b>" + " " + info.nearest_area[0].country[0].value
    weatherList.querySelectorAll("li")[3].innerHTML = "<b>Currently Feels Like:<b> " + info.current_condition[0].FeelsLikeF + "°F"
})
.catch((error) => {
    // You can do what you like with the error here.
    console.log(error);
});
} 








