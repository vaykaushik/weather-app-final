// Retrieving all DOM elements

// FROM API

const city = document.querySelector('.city');
const icon = document.querySelector('.icon');
const description = document.querySelector('.description');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind');

// FROM MARKUP

const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('button');

let weather = {

    // API Key

    "apiKey": "f2915c8e65642074b0f64ca811b9648f",

    // Method for fetching data

    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then(response => response.json())
        .then(data => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon: cloudIcon, description: weatherDescription } = data.weather[0];
        const { temp, humidity: humidityPercent } = data.main;
        const { speed } = data.wind;

        console.log(name, cloudIcon, description, temp, humidityPercent, speed);

        city.innerHTML = `<span>${name}</span>`;
        icon.src = `https://openweathermap.org/img/wn/${cloudIcon}.png`;
        description.innerText = `${weatherDescription}`;
        temperature.innerHTML = `${Math.round(temp)}<span>°C</span>`;
        humidity.innerText = `Humidity: ${humidityPercent}%`;
        windSpeed.innerText = `Wind Speed: ${speed}km/h`;
    },

    search: function() {
        this.fetchWeather(searchBar.value);
    },
};

searchButton.addEventListener('click', e => {
    weather.search();
});

searchBar.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        weather.search();
    }
});

weather.fetchWeather("");