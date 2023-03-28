
let formLocation = document.getElementById("form-location");

formLocation.addEventListener("submit", (event) => {
    event.preventDefault()
    let noPrevious = document.getElementById("m2");
    let noPreviousMain = document.getElementById("m1");
    if (noPrevious) {
        noPrevious.remove();
        noPreviousMain.remove();
    }
    let location = document.getElementById("Location");
    ReadApi(location.value);
    location.value = "";
})

let celsius = document.getElementById("to-c");
let fahrenheit = document.getElementById("to-f");


celsius.addEventListener("click", (e) => {
    fahrenheit.checked = false;
});
fahrenheit.addEventListener("click", (e) => {
    celsius.checked = false;
});

//c=(f-32)*(5/9)
//f=(c*(9/5))+32
let formTemp = document.getElementById("form-widget-temp");
formTemp.addEventListener("submit", (e) => {
    e.preventDefault();
    let temperature = document.getElementById("temp-to-convert");
    let result = document.getElementById("result");
    if (celsius.checked) {
        result.textContent = ((temperature.value - 32) * (5 / 9)).toFixed(2);
    } else {
        if (fahrenheit.checked) {
            result.textContent = ((temperature.value * (9 / 5)) + 32).toFixed(2);
        }
    }
})

function ReadApi(search) {
    let promise = fetch("https://wttr.in/" + search + "?format=j1");
    promise.then(
        (res) => res.json()
    ).then(
        (resp) => {
            let main = document.getElementById("mainarticle");
            let mainaside = document.getElementById("mainaside");
            let history = document.getElementById("history");
            let newHist = document.createElement("li");
            let chancesunshineInd = [0, 0, 0];
            let chancerainInd = [0, 0, 0];
            let chancesnowInd = [0, 0, 0];
            let i = 0;
            resp.weather.forEach(e => {
                e.hourly.forEach(element => {
                    chancesunshineInd[i] += parseFloat(element.chanceofsunshine);
                    chancerainInd[i] += parseFloat(element.chanceofrain);
                    chancesnowInd[i] += parseFloat(element.chanceofsnow);
                });
                chancesunshineInd[i] /= 8;
                chancerainInd[i] /= 8;
                chancesnowInd[i] /= 8;
                i++
            })
            let mainHtml =
                selectImage(chancesunshineInd[0], chancerainInd[0], chancesnowInd[0]) +
                "<h2>" + search + "</h2>" +
                "<p><b>Nearest Area: </b>" + resp.nearest_area[0].areaName[0].value + "</p>" +
                "<p><b>Region: </b>" + resp.nearest_area[0].region[0].value + "</p>" +
                "<p><b>Country: </b>" + resp.nearest_area[0].country[0].value + "</p>" +
                "<p><b>Currently: </b> Feels Like " + resp.current_condition[0].FeelsLikeF + "°F</p>" +
                "<p><b>Chance of Sunshine: </b>" + chancesunshineInd[0].toFixed(2) + "</p>" +
                "<p><b>Chance of Rain: </b>" + chancerainInd[0].toFixed(2) + "</p>" +
                "<p><b>Chance of Snow: </b>" + chancesnowInd[0].toFixed(2) + "</p>";
            main.innerHTML = mainHtml;

            let days = ["Today", "Tomorrow", "Day After Tomorrow"];
            let mainAsideHtml = "";
            for (let index = 0; index < 3; index++) {
                mainAsideHtml +=
                    "<article><h2>" + days[index] + "</h2>" +
                    "<p><b>Average Temperature: </b>" + resp.weather[index].avgtempF + "°F</p>" +
                    "<p><b>Max Temperature: </b>" + resp.weather[index].maxtempF + "°F</p>" +
                    "<p><b>Min Temperature: </b>" + resp.weather[index].mintempF + "°F</p></article>"
            }
            mainaside.innerHTML = mainAsideHtml;
            newHist.textContent = search + " - " + resp.current_condition[0].FeelsLikeF + "°F";
            history.appendChild(newHist);
        }
    ).catch((error) => {
        let main = document.getElementById("mainarticle");
        main.textContent = "Unknown Location";
    })
}

function selectImage(chancesunshine, chancerain, chancesnow) {
    switch (Math.max(chancesunshine, chancerain, chancesnow)) {
        case chancesunshine:
            if (chancesunshine > 50) {
                return "<img src=\"./assets/icons8-summer.gif\" alt=\"sun\">";
            } else {
                return "<img src=\"./assets/icons8-wind.gif\" alt=\"sun\">";
            }
        case chancerain:
            if (chancerain > 50) {
                return "<img src=\"./assets/icons8-torrential-rain.gif\" alt=\"rain\">";
            } else {
                return "<img src=\"./assets/icons8-storm.gif\" alt=\"rain\">";
            }
        case chancesnow:
            if (chancesnow > 50) {
                return "<img src=\"./assets/icons8-light-snow.gif\" alt=\"snow\">";
            } else {
                return "<img src=\"./assets/icons8-icy-50.gif\" alt=\"snow\">";
            }
    }
}