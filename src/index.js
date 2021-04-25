import { nodeCreator, chainAppend } from './nodeCreator';

const apiKey = '1ebf85132fae8866f42ade66510b07df';
const search = document.getElementById('search');
const submit = document.getElementById('submit');

function displayToggler(display, number, text) {
  const toggler = nodeCreator('button', { id: "toggler", class: "btn btn-primary" }, "°C / °F")
  toggler.addEventListener('click', ()=> {
    let degree = Number(number.textContent)
    if (text.textContent == '°C') {
      degree = ((degree * 9 / 5) + 32).toFixed(1)
      number.textContent = degree    
      text.textContent = '°F'
    } else if (text.textContent == '°F') {
      degree = ((degree - 32) * 5 / 9).toFixed(1)
      number.textContent = degree   
     text.textContent = '°C'
    }
  })

  chainAppend([display, toggler])
}

function removeChild(parent) {
  if (parent.firstChild) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}

function getResult() {
  const body = document.querySelector('body');
  const display = document.getElementById('display');
  const city = nodeCreator('div', { id: 'city' });
  const weather = nodeCreator('div', { id: 'weather', class: "celcius" });
  const degreeNumber = nodeCreator('span', { id: "degree_number" })
  const degreeText = nodeCreator('span', { id: "degree_text" }, "°C")
  const weatherType = nodeCreator('div', { id: 'weather_type' });
  const weatherTypeText = nodeCreator('span', { id: 'for_text' });
  const err = nodeCreator('div', { id: 'error' });
  const cityName = search.value;
  let degree = null;
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
    { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      removeChild(display)
      city.textContent = response.name;
      degree = (response.main.temp - 273.15).toFixed(1);
      degreeNumber.textContent = `${degree}`;
      weatherTypeText.textContent = response.weather[0].main;
      chainAppend([display, city]);
      chainAppend([weather, degreeNumber]);
      chainAppend([weather, degreeText]);
      chainAppend([display, weather]);
      chainAppend([display, weatherType, weatherTypeText]);
      displayToggler(display, degreeNumber, degreeText)
    })
    .catch(() => {
      removeChild(display)
      err.textContent = 'City not found';
      chainAppend([body, display, err]);
    });
}


submit.addEventListener('click', (e) => {
  e.preventDefault();
  getResult();
});
