 //entrar a la url de la api y nos va a devolver lo que sea que encuentre
let formLocation = document.getElementById("form-location")
ReadApi("https://wttr.in/Montreal?format=j1")

formLocation.addEventListener("submit", (event) => {
    event.preventDefault()
    let location = document.getElementById("Location")
    ReadApi("https://wttr.in/" + location.value + "?format=j1")
})

function ReadApi(apiurl) {
    let promise = fetch(apiurl)
    promise.then(
        (res) => res.json()
    ).then(
        (resp) => {
            console.log(resp);
        }
    )
}
