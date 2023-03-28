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
            // Call the function to change the background image based on the weather condition
            changeBackgroundImage(weatherObj);
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
                    // Call the function to change the background image based on the weather condition
                    changeBackgroundImage(weatherObj);
                });
                // Add the new list item to the history list
                ul.append(li);
            } else {
                // Create a new list item for the new location
                const li = document.createElement("li");
                li.innerHTML = `<a href="#">${location}</a> - ${today}°F`;

                // Add a click event listener to the new list items
                li.addEventListener("click", (event) => {
                    event.preventDefault();
                    // Call the search function with the weather object
                    search(weatherObj);
                    // Call the function to change the background image based on the weather condition
                    changeBackgroundImage(weatherObj);
                });
                // Add the new list item to the history list
                ul.append(li);
            }
            // Reset the form input
            event.target.reset();
        });
});

function changeBackgroundImage(weatherObj) {
    const condition = weatherObj.current_condition[0].weatherDesc[0].value.toLowerCase();
    const backgroundImages = {
        "clear": "url(https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618__480.jpg)",
        "partly cloudy": "url(https://t4.ftcdn.net/jpg/05/03/95/29/360_F_503952909_nhsGUEWQElxi6Qyp0jXDgdxJxr5epOmi.jpg)",
        "cloudy": "url(https://www.gannett-cdn.com/-mm-/033e3009f1c9a067cfc2b98082cf9bade8f7ddc5/c=0-201-2054-1362/local/-/media/MIGroup/PortHuron/2014/08/27/1409139184000-Cloudy.jpg?width=2054&height=1161&fit=crop&format=pjpg&auto=webp)",
        "overcast": "url(https://upload.wikimedia.org/wikipedia/commons/a/a3/Overcast_skies_from_Tropical_Storm_Danny.jpg)",
        "sunny": "url(https://www.dailyleader.com/wp-content/uploads/sites/18/2021/05/sunny.jpeg?w=1024)",
        "Mist": "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIiLygxrhLR1VTt89m74Y1ZmATlSAPgM3oCg&usqp=CAU)",
        "light rain": "url(https://static.toiimg.com/thumb/msid-81118814,width-400,resizemode-4/81118814.jpg)",
        "heavy rain": "url(https://www.freightwaves.com/wp-content/uploads/2018/10/shutterstock_heavyrain-1.jpg)",
        "patchy moderate snow": "url(https://c8.alamy.com/comp/CNB7G1/aerial-view-showing-patchy-snow-on-the-hill-tops-in-the-pennines-CNB7G1.jpg)",
        "Light snow": "url(https://www.fayettevilleflyer.com/wp-content/uploads/2019/03/snow-7.jpg)",
        "moderate snow": "url(https://media.istockphoto.com/id/1066960598/photo/winter-holiday-background-with-snow-copy-space.jpg?s=612x612&w=0&k=20&c=KjOIp2ns1988noHZXBT8DbS3fOlhd_GXSHsoO7vtAeE=)",
        "Heavy snow": "url('heavy-snow.jpg')",
        "thunder": "url(https://imengine.public.prod.dur.navigacloud.com/?uuid=6B1E0381-5A0D-4A4B-B336-3298EDFB8CDD&function=original&type=preview)",
        "freezing fog": "url(https://www.treehugger.com/thmb/Di1DHYe-mRq52OsFSgoqW2OUtuM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-643350354-0db030672bfb45f5a82e12ae5b64fa09.jpg)"
    };
    const body = document.querySelector("body");
    body.style.backgroundImage = backgroundImages[condition];
};
