document.querySelector("form").addEventListener("submit", (event) => {

    event.preventDefault()

    console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")

    fetch(`https://wttr.in/${event.target.location.value}?format=j1`).then(result => {

        console.log("Fetch was successful")

        return result.json()

    }).then(weather => {

        
        let searchLocation = event.target.location.value
       
         event.target.location.value = ""

      
         let searchResult = document.querySelector("article") 
      
        searchResult.innerHTML = ""
        let h2 = document.createElement("h2")
      
        h2.textContent = searchLocation
     
        searchResult.append(h2)

  
        let area = weather.nearest_area[0].areaName[0].value
       
        let areaP = document.createElement("p")
       
            areaP.textContent = `Area: ${area}`
      
        searchResult.append(areaP)

   
        let region = weather.nearest_area[0].region[0].value

    
        let regionP = document.createElement("p")

        regionP.textContent = `Region: ${region}`
     
        searchResult.append(regionP)

       
        let country = weather.nearest_area[0].country[0].value

        
        let countryP = document.createElement("p")

         
        countryP.textContent = `Country: ${country}`
      
        searchResult.append(countryP)

        let feelsLike = weather.current_condition[0].FeelsLikeF

        let feelsLikeP = document.createElement("p")

        feelsLikeP.textContent = `Currently: Feels Like ${feelsLike}°F`

        searchResult.append(feelsLikeP)

        let firstAvg = weather.weather[0].avgtempF

        let firstAvgP = document.createElement("p")

        firstAvgP.textContent = `Average Temperature: ${firstAvg}°F`

        //  selecting empty articles in HTML 
        let today = document.querySelector(".today")
        let tomorrow = document.querySelector(".tomorrow")
        let dayaftertomorrow = document.querySelector(".dayaftertomorrow")

        
        today.innerHTML = "<h2> Today </h2>"

        today.append(firstAvgP)

        let firstMax = weather.weather[0].maxtempF

        let firstMaxP = document.createElement("p")

        firstMaxP.textContent = `Max Temperature: ${firstMax}°F`

        today.append(firstMaxP)

        let firstMin = weather.weather[0].mintempF

        let firstMinP = document.createElement("p")

        firstMinP.textContent = `Min Temperature: ${firstMin}°F`

        today.append(firstMinP)

    tomorrow.innerHTML = "<h2> Tomorrow </h2>"

        let secondMax = weather.weather[1].maxtempF

        let secondMaxP = document.createElement("p")

        secondMaxP.textContent = `Max Temperature: ${secondMax}°F`

        tomorrow.append(secondMaxP)

        let secondAvg = weather.weather[1].avgtempF

        let secondAvgP = document.createElement("p")

        secondAvgP.textContent = `Average Temperature: ${secondAvg}°F`

        tomorrow.append(secondAvgP)

        let secondMin = weather.weather[1].mintempF

        let secondMinP = document.createElement("p")

        secondMinP.textContent = `Min Temperature: ${secondMin}°F`

        tomorrow.append(secondMinP)

        // _________________________________________________

        dayaftertomorrow.innerHTML = "<h2> Day After Tomorrow </h2>"

        let thirdMax = weather.weather[2].maxtempF

        let thirdMaxP = document.createElement("p")

        thirdMaxP.textContent = `Max Temperature: ${thirdMax}°F`

        dayaftertomorrow.append(thirdMaxP)

        let thirdAvg = weather.weather[2].avgtempF

        let thirdAvgP = document.createElement("p")

        thirdAvgP.textContent = `Average Temperature: ${thirdAvg}°F`

        dayaftertomorrow.append(thirdAvgP)

        let thirdMin = weather.weather[2].mintempF

        let thirdMinP = document.createElement("p")

        thirdMinP.textContent = `Min Temperature: ${thirdMin}°F`

        dayaftertomorrow.append(thirdMinP)

        let searchedList = document.querySelector(".searches");
       
        if(document.querySelector(".searches p")){
        document.querySelector(".searches p").remove() 
        }
         if (!searchedList.textContent.includes(searchLocation)) {
       
         let pSearch = document.createElement("li")
   
         pSearch.innerHTML = `<a class="recent">${searchLocation}</a>-${feelsLike}`

         searchedList.append(pSearch)
     
         let recentLink = document.querySelector(".recent")

         recentLink.addEventListener("click" , () => {
     
            fetch(`https://wttr.in/${recentLink.textContent}?format=j1`).then(result => {

                console.log("Fetch was successful")

                return result.json()

            }).then(weather => {

                
              
                let searchLocation = recentLink.textContent
               
                
                 let searchResult = document.querySelector("article") 
              
                searchResult.innerHTML = ""
                let h2 = document.createElement("h2")
             
                h2.textContent = searchLocation
               
                searchResult.append(h2)

             
                let area = weather.nearest_area[0].areaName[0].value
              
                let areaP = document.createElement("p")
              
                    areaP.textContent = `Area: ${area}`
              
                searchResult.append(areaP)

                let region = weather.nearest_area[0].region[0].value

             
                let regionP = document.createElement("p")

                 
                regionP.textContent = `Region: ${region}`
             
                searchResult.append(regionP)

            
                let country = weather.nearest_area[0].country[0].value

                let countryP = document.createElement("p")

              
                countryP.textContent = `Country: ${country}`
             
                searchResult.append(countryP)

                let feelsLike = weather.current_condition[0].FeelsLikeF

                let feelsLikeP = document.createElement("p")

                feelsLikeP.textContent = `Currently: Feels Like ${feelsLike}°F`

                searchResult.append(feelsLikeP)

                let firstAvg = weather.weather[0].avgtempF

                let firstAvgP = document.createElement("p")

                firstAvgP.textContent = `Average Temperature: ${firstAvg}°F`

                let today = document.querySelector(".today")
                let tomorrow = document.querySelector(".tomorrow")
                let dayaftertomorrow = document.querySelector(".dayaftertomorrow")

           
                today.innerHTML = "<h2> Today </h2>"

                today.append(firstAvgP)

                let firstMax = weather.weather[0].maxtempF

                let firstMaxP = document.createElement("p")

                firstMaxP.textContent = `Max Temperature: ${firstMax}°F`

                today.append(firstMaxP)

                let firstMin = weather.weather[0].mintempF

                let firstMinP = document.createElement("p")

                firstMinP.textContent = `Min Temperature: ${firstMin}°F`

                today.append(firstMinP)
      
            tomorrow.innerHTML = "<h2> Tomorrow </h2>"

                let secondMax = weather.weather[1].maxtempF

                let secondMaxP = document.createElement("p")

                secondMaxP.textContent = `Max Temperature: ${secondMax}°F`

                tomorrow.append(secondMaxP)

                let secondAvg = weather.weather[1].avgtempF

                let secondAvgP = document.createElement("p")

                secondAvgP.textContent = `Average Temperature: ${secondAvg}°F`

                tomorrow.append(secondAvgP)

                let secondMin = weather.weather[1].mintempF

                let secondMinP = document.createElement("p")

                secondMinP.textContent = `Min Temperature: ${secondMin}°F`

                tomorrow.append(secondMinP)


                dayaftertomorrow.innerHTML = "<h2> Day After Tomorrow </h2>"

                let thirdMax = weather.weather[2].maxtempF

                let thirdMaxP = document.createElement("p")

                thirdMaxP.textContent = `Max Temperature: ${thirdMax}°F`

                dayaftertomorrow.append(thirdMaxP)

                let thirdAvg = weather.weather[2].avgtempF

                let thirdAvgP = document.createElement("p")

                thirdAvgP.textContent = `Average Temperature: ${thirdAvg}°F`

                dayaftertomorrow.append(thirdAvgP)

                let thirdMin = weather.weather[2].mintempF

                let thirdMinP = document.createElement("p")

                thirdMinP.textContent = `Min Temperature: ${thirdMin}°F`

                dayaftertomorrow.append(thirdMinP)
         })
    })
    
        recentLink.classList.toggle("recent")
}

});
})







