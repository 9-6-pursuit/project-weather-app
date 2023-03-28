 
 let formLocation = document.getElementById("form-location")

formLocation.addEventListener("submit", (event) => {
    event.preventDefault()
    let noPrevious=document.getElementById("m2")
    if(noPrevious) noPrevious.remove();
    let location = document.getElementById("Location")
    let temp = ReadApi(location.value)
    location.value=""

})

let celsius = document.getElementById("to-c")
let fahrenheit = document.getElementById("to-f")


celsius.addEventListener("click", (e) => {
    fahrenheit.checked = false
})
fahrenheit.addEventListener("click", (e) => {
    celsius.checked = false
})

//c=(f-32)*(5/9)
//f=(c*(9/5))+32
let formTemp = document.getElementById("form-widget-temp")
formTemp.addEventListener("submit", (e) => {
    e.preventDefault()
    let temperature = document.getElementById("temp")
    let result = document.getElementById("result")
    if (celsius.checked) {
        result.textContent = (temperature.value - 32) * (5 / 9)
    } else {
        if (fahrenheit.checked) {
            result.textContent = (temperature.value * (9 / 5)) + 32
        }
    }
})

function ReadApi(search) {
    let promise = fetch("https://wttr.in/" + search + "?format=j1")
    promise.then(
        (res) => res.json()
    ).then(
        (resp) => {

            let history = document.getElementById("history")
            let newHist = document.createElement("li")
            newHist.textContent = search+ " " + resp.current_condition[0].FeelsLikeF + "°F"
            history.appendChild(newHist)
        }
    )
}
