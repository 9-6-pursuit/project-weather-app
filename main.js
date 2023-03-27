const weatherBox = document.getElementById('weather-box')
const cityNameInput = document.getElementById('city-name-input')
const searchButton = document.getElementById('search-button')

searchButton.addEventListener('click', event => {
    let cityName = cityNameInput.value
    cityNameInput.value = ''

    let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`)

    receivedPromise.then(response => {
        return response.json()
    }).then(json => {
        fillWeatherBox(json, cityName)
    })
})

const fillWeatherBox = (json, cityName) => {
    weatherBox.innerHTML = ''

    let label = document.createElement('h3')
    label.textContent = cityName
    weatherBox.append(label)

    let areaName = json.nearest_area[0].areaName[0].value
    let area = document.createElement('li')
    area.className = `weather-box-item`
    area.innerHTML = `<strong>Area:</strong> ${areaName}`
    weatherBox.append(area)
}