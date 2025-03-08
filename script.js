document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'e634d5e076ad0902af407be6dcb6639d';
    const weatherContainer = document.getElementById("weather");
    const cityDisplay = document.getElementById("city");
    const errorDisplay = document.getElementById('error');
    const cityInput = document.getElementById('cityInput');
    
    const units = 'metric';
    const temperatureSymbol = units === 'imperial' ? "°F" : "°C";

       // Fetch weather when button is clicked
       document.getElementById('submitBtn').addEventListener('click', fetchWeather);

    async function fetchWeather() {
        try {
            weatherContainer.innerHTML = ''; //Clear previous data
            errorDisplay.textContent = '';  //Clear previous errors
            cityDisplay.textContent = '';  //Clear previous city name

            const city = cityInput.value; //Get city from input field
            if (!city) {
                errorDisplay.textContent = "Please enter a city name.";
                return;
            }

            const cnt = 10;
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}&cnt=${cnt}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || response.statusText;
                throw new Error(errorMessage);
            }

            const data = await response.json();

            cityDisplay.textContent = `Hourly Weather for ${data.city.name}, ${data.city.country}`;

            data.list.forEach(hourlyWeatherData => {
                const hourlyWeatherDataDiv = createWeatherDescription(hourlyWeatherData);
                weatherContainer.appendChild(hourlyWeatherDataDiv);
            });

        } catch (error) {
            console.error("Error fetching weather:", error);
            errorDisplay.textContent = "Error: " + error.message;
        } finally {
            cityInput.value = '';
        }
    }

    function convertToLocalTime(dt) {
        const date = new Date(dt * 1000);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleString('en-US', options);
    }

    function createWeatherDescription(weatherData) {
        const { main, dt, weather } = weatherData;

        const description = document.createElement("div");
        const formattedTime = convertToLocalTime(dt);
        const weatherDescription = weather[0].description;

        description.innerHTML = `
            <div class="weather_description">
                ${main.temp}${temperatureSymbol} - ${formattedTime.slice(11)} - ${formattedTime.slice(0, 10)} - ${weatherDescription}
                <img src="https://openweathermap.org/img/w/${weather[0].icon}.png" alt="Weather Icon">
            </div>
        `;
        return description;
    }
});