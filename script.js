let submit = document.getElementById("submit-button")

let info = {}

let textBox = document.querySelector("input")

let weatherList = document.getElementById("weather-box-list")

let days = document.getElementsByClassName("days-box")[0].querySelectorAll("ul")

let today = document.getElementsByClassName(".Today")

let tomorrow = document.querySelector(".Tomorrow")

let dayAfterTomorrow = document.getElementById("Day-After-Tomorrow-List")

submit.onclick = function() {
    fetch(`https://wttr.in/${textBox.value}?format=j1`)
    .then((reponse) => reponse.json())
    .then((json) => {
    // You can do what you like with the result here.
    info = json
    // console.log(dayAfterTomorrow.querySelectorAll("li"))
    


for (let d = 0; d < days.length; d++) {
    days[d].querySelectorAll("li")[0].innerHTML = "<b>Average Temperature:</b> " + info.weather[d].avgtempF
    days[d].querySelectorAll("li")[1].innerHTML = "<b>Max Temperature:<b> " + info.weather[d].maxtempF
    days[d].querySelectorAll("li")[2].innerHTML = "<b>Min Temperature:<b> " + info.weather[d].mintempF
    


    console.log(d)
    // dayAfterTomorrow.querySelectorAll("li")[0].innerHTML = "Average Temperature: " + info.weather[2].maxtempF + "°F"
    }
    
// info.weather[2].mintempF

// info.weather[2].avgtempF
    
    // weatherList.querySelectorAll("li")[0].innerHTML = "Area: " + info.nearest_area[0].areaName[0].value
    // weatherList.querySelectorAll("li")[1].innerHTML = "Region: " + " " +  info.nearest_area[0].region[0].value
    // weatherList.querySelectorAll("li")[2].innerHTML = "Country: " + " " + info.nearest_area[0].country[0].value
    // weatherList.querySelectorAll("li")[3].innerHTML = "Currently Feels Like: " + info.current_condition[0].FeelsLikeF + "°F"
})
.catch((error) => {
    // You can do what you like with the error here.
    console.log(error);
});
} 



//today tomorrow dayafter tomorrow FeelsLikeF: avgtempF: maxtempF: "49" mintempF: "39" country region area  info.
// console.log(info.current_condition[0].FeelsLikeF);



