// Function to fetch weather data from the server
async function fetchWeatherData() {
    try {
        const response = await fetch('/weather-data');
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        // Parse the JSON data from the response
        const weatherData = await response.json();

        // Process and display the weather data
        displayWeatherData(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display the weather data on the page
function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather');
    const cityContainer = document.getElementById('city');

    // Example of displaying city name
    cityContainer.textContent = `Weather Forecast for ${data.city}, ${data.country}`;

    // Clear previous weather data
    weatherContainer.innerHTML = '';

    // Loop through the forecast data and display it
    data.forecast.forEach(item => {
        const weatherDiv = document.createElement('div');
        weatherDiv.classList.add('weather-item');
        weatherDiv.innerHTML = `
            <p>Time: ${item.time}</p>
            <p>Temperature: ${item.temperature}°C</p>
            <p>Description: ${item.description}</p>
        `;
        weatherContainer.appendChild(weatherDiv);
    });
}

// Call the function to fetch weather data when the page loads
document.addEventListener('DOMContentLoaded', fetchWeatherData);