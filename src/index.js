const  apiKey = "1ebf85132fae8866f42ade66510b07df"
fetch(`http://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${apiKey}`,
{ mode: 'cors'})
.then(function(response) {
  return response.json()
})
.then(function(response) {
  console.log(response)
})
.catch(function(error) {
  console.log(error)
})


// `http://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${apiKey}`