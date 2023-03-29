
let location = document.getElementById("location")
const current  = document.querySelector(".current")
let searchBox = document.querySelector(".search")

function fetchWeather(city) {
    let promise = fetch(`https://wttr.in/${city}?format=j1`)
    promise.then(response => {
        return response.json()
    }).then(result => {
        fillWeatherBox(json, city)
    }).catch(error => console.error(error))

     


}

