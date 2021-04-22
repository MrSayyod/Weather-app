import { nodeCreator, chainAppend } from './nodeCreator';

const apiKey = '1ebf85132fae8866f42ade66510b07df';
const search = document.getElementById('search');
const submit = document.getElementById('submit');
function getResult() {
  const body = document.querySelector('body');
  const display = nodeCreator('div', { id: 'display' });
  const city = nodeCreator('div', { id: 'city' });
  const weather = nodeCreator('div', { id: 'weather' });
  const weatherType = nodeCreator('div', { id: 'weather_type' });
  const weatherTypeText = nodeCreator('span', { id: 'for_text' });
  const err = nodeCreator('div', { id: 'error' });
  const cityName = search.value;
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
    { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      chainAppend([display, city]);
      chainAppend([display, weather]);
      chainAppend([display, weatherType, weatherTypeText]);
      chainAppend([body, display]);
      city.textContent = response.name;
      weather.textContent = `${response.main.temp - 273.15}° C`;
      weatherTypeText.textContent = response.weather[0].main;
    })
    .catch(() => {
      err.textContent = 'City not found';
      chainAppend([body, display, err]);
    });
}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  getResult();
});
