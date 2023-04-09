
const weatherBox = document.getElementById("weather-box")
//console.log(weatherBox);

const enteredinput = document.getElementById("entered-Input")
//console.log(enteredinput)
const searchButton = document.getElementById("search-Button")

searchButton.addEventListener("click", event => {
    event.preventDefault()
     entered = enteredinput.value
     enteredinput.value = ""
    //console.log(entered);
    
    if (entered)
    {
        let promise = fetch(`https://wttr.in/${entered}?format=j1`)
        //console.log(promise);
        promise.then(response => {
            return response.json()
        }).then(json => {
            fillWeatherBox(json, entered) 
        }).catch(e => {
            console.error(e);
        })
    }else {
        errorMsg = document.createElement("h2")
        //errorMsg.classList("error")
        errorMsg.innerHTML = `Input cannot be empty`
        weatherBox.append(errorMsg)
    }
    
    
})


const fillWeatherBox = (json, entered) => {
    weatherBox.innerHTML = ""
     window.sydney = json

    let newHead = document.createElement("h3")
    newHead.textContent = entered
    weatherBox.append(newHead)

    let area = json.nearest_area[0].areaName[0].value
    let areaName = document.createElement("li")
    areaName.classList = "newAddedLines"
    areaName.innerHTML = `<strong>Area:</strong> ${area}`
    weatherBox.append(areaName)

    let region = json.nearest_area[0].region[0].value
    let reg = document.createElement("li")
    reg.classList = "newAddedLines"
    reg.innerHTML =`<strong>Region:</strong> ${region}`
    weatherBox.append(reg)

    let country = json.nearest_area[0].country[0].value
    let count = document.createElement("li")
    count.classList = "newAddedLines"
    count.innerHTML =`<strong>Country:</strong> ${country}`
    weatherBox.append(count)
    
    let currently = json.current_condition[0].FeelsLikeF
    let curr = document.createElement("li")
    curr.classList = "newAddedLines"
    curr.setAttribute("id", "tog")
    curr.innerHTML =`<strong>Currently:</strong> ${currently}°F`
    weatherBox.append(curr)
    

   let addOn = document.getElementById("weather-box-addon")
    //console.log(addOn)
    addOn.innerHTML = ""
    newAddOn = document.createElement("li")
    newAddOn.classList = "fontSize"
    newAddOn.innerHTML = `${entered} - ${currently}°F` 
    let sideAddition = document.getElementById("weather-box-item")
    sideAddition.append(newAddOn)

//forcast- third box//
    let days = ["Today", "Tomorrow", "Day After Tomorrow"];
    for (let i = 0; i < 3; i++) {
        let classDay = document.querySelector(`.day${i}`);
        classDay.innerHTML = "";
        let header = document.createElement("h3");
        header.className = "third-box-text";
        header.innerText = days[i];
        let avgTemp = document.createElement("li");
        avgTemp.className = "third-box-text";
        avgTemp.innerHTML = `<strong>Avarage Temperature:</strong> ${json.weather[i].avgtempF}°F`;
        let maxTemp = document.createElement("li");
        maxTemp.className = "third-box-text";
        maxTemp.innerHTML = `<strong>Max Temperature:</strong> ${json.weather[i].maxtempF}°F`;
        let minTemp = document.createElement("li");
        minTemp.className = "third-box-text";
        minTemp.innerHTML = `<strong>Min Temperature:</strong> ${json.weather[i].mintempF}°F`;
        classDay.append(header, avgTemp, maxTemp, minTemp);
    }
    
    


    let celcius = json.current_condition[0].FeelsLikeC
    let cel = document.createElement("li")
    cel.classList = "newAddedLines"
    cel.setAttribute("id", "tog1")
    cel.innerHTML =`<strong>Currently:</strong> ${celcius}°C`
    weatherBox.append(cel)
   
         const toggel = document.getElementById("last-Button")
         toggel.addEventListener("click",event => {
            if (curr.style.display === "block" && cel.style.display === "none" ){
                curr.style.display = "none"
                cel.style.display = "block"
            }   else {
                curr.style.display = "block"
                cel.style.display = "none"
                }
        })

        // console.log(json);
    
        
       
}