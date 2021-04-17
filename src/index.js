const  apiKey = "1ebf85132fae8866f42ade66510b07df"
const search = document.getElementById('search')
const submit = document.getElementById("submit")

function getResult() {
  const city = search.value
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
  { mode: 'cors'})
  .then(function(response) {
    return response.json()
  })
  .then(function(response) {
    // console.log(response);
    let result = {
      "city": response.name,
      "temperature" : response.main.temp 
    }
    console.log(`City: ${result.city} \n Temperate: ${result.temperature} in Kalvin`)
    let jsonResult =  JSON.stringify(result)
    console.log(jsonResult);
    return jsonResult
  })
  .catch(function(error) {
    console.log(error)
    console.log("City not found")
  })
}

submit.addEventListener('click', (e)=> {
  e.preventDefault()
  getResult()
})


// `http://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${apiKey}`