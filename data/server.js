const express = require('express');
const path = require('path');
const app = express();
const port = 3000;  

// Serve static files (HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));  // Assuming your files are in the 'public' folder

// Route to serve JSON data
app.get('/data', (req, res) => {
    res.json({
        message: "This is your JSON data response!",
        info: "Here you can include weather data or any other data."
    });
});

// Alternatively, serve a specific JSON file
app.get('/weather-data', (req, res) => {
    const weatherData = require('./data/weather.json');  // Assuming a 'weather.json' file in the 'data' folder
    res.json(weatherData);
});

// Listen on the specified port
app.listen(port, () => {
    console.log(`Server running at https://emmc1.github.io/Project/}`);
});

