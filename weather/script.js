const apiKey = 'b17a41257f2f4a04a39183722240503';
const weatherInfoDiv = document.getElementById('weatherInfo');

async function getWeather() {
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value.trim();

    if (location === '') {
        alert('Please enter a location');
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.status === 400 || response.status === 404) {
            alert('Location not found. Please try again.');
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

function displayWeather(data) {
    const { location, current } = data;

    const weatherHtml = `
        <h2>${location.name} Weather</h2>
        <p>Temperature: ${current.temp_c}°C</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Condition: ${current.condition.text}</p>
    `;

    weatherInfoDiv.innerHTML = weatherHtml;
}
