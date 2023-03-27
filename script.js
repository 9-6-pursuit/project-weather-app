// Add event listener to the form submit event
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    // Get the location from the form input
    const location = event.target.location.value;
    // Create the URL for the weather API request
    const BASE_URL = `https://wttr.in/${location}?format=j1`;
    // Send a GET request to the weather API and get the response as a JSON object
    fetch(BASE_URL)
        .then((response) => response.json())
        .then((weatherObj) => {
            console.log(weatherObj);
            // Get the current temperature in Fahrenheit
            const today = weatherObj.current_condition[0].FeelsLikeF;
            // Call the search function with the weather object
            search(weatherObj);

            // Get the history list element
            const ul = document.querySelector("#hist_ul");
            // If the history list is empty, remove the "No previous searches" message and add the new location to the list
            if (ul.firstElementChild.textContent === "No previous searches") {
                ul.firstElementChild.remove();
                // Create a new list item for the new location
                const li = document.createElement("li");
                li.innerHTML = `<a href="#">${location}</a> - ${today}°F`;

                // Add a click event listener to the new list item
                li.addEventListener("click", (event) => {
                    event.preventDefault();
                    // Call the search function with the weather object
                    search(weatherObj);
                });
                // Add the new list item to the history list
                ul.append(li);
            } else {
                // Create a new list item for the new location
                const li = document.createElement("li");
                li.innerHTML = `<a href="#">${location}</a> - ${today}°F`;

                // Add a click event listener to the new list item
                li.addEventListener("click", (event) => {
                    event.preventDefault();
                    // Call the search function with the weather object
                    search(weatherObj);
                });
                // Add the new list item to the history list
                ul.append(li);
            }
            // Reset the form input
            event.target.reset();
        });
});
