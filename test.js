console.log("Here is the weather")

const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let location = document.querySelector("#input").value
    let weather = `https://wttr.in/${location}?format=j1`
    let weatherBox = document.querySelector(".weather-box")
    
    fetch(weather)
    .then((response) => response.json())
    .then((json)=> {

    weatherBox.innerHtml = ""
    let label = document.createElement("h3")
    label.textContent = cityName
    weatherBox.append(label)

    



console.log(json)
    })
    .catch((error) => {


    })


})