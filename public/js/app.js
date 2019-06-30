console.log('Client side javascript file is loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const weatherSummary = document.querySelector('#weather-summary');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherSummary.textContent = '';
    p2.textContent = '';
    p1.textContent = 'Loading ...';
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    p1.textContent = 'Error fetching data...'
                } else {
                    weatherSummary.textContent = data.summary;
                    p2.textContent = `Current temperature  ${data.currentTemperature} F`;
                    p1.textContent = `Precipitation probability = ${data.precipProbability} %`;
                }
            })
        });
});