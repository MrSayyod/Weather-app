export default function getResult(search, api) {
  const city = search.value
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`,
  { mode: 'cors'})
  .then(function(response) {
    return response.json()
  })
  .then(function(response) {
    let result = {
      "city": response.name,
      "temperature" : response.main.temp 
    };
    console.log(`City: ${result.city} \n Temperate: ${result.temperature} in Kalvin`)
    let jsonResult =  JSON.stringify(result)
    // console.log(jsonResult);
    // console.log(response);
    return jsonResult
  })
  .catch(function(error) {
    console.log(error)
    console.log("City not found")
  })
}


