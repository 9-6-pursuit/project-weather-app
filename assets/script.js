// alert('javaScript connected!!')

const form  = document.querySelector("form")
const BASE_URL = "https://wttr.in/New+York?format=j1"

form.addEventListener("submit", (event)=>{
  event.preventDefault();

  fetch(BASE_URL)
  .then((response) => response.json())
  .then((json) => {
    json.results.forEach((result) =>{
        displayTrivia(result)
        showDifficulty(result)
      })
    })
    .catch(showError(error));

    let triviaArticles = document.querySelectorAll('article.card')
    showCorrectAnswers(triviaArticles)
})

//https://wttr.in/New+York?format=j1